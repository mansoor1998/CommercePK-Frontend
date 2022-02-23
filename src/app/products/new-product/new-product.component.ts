import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewProductComponent implements OnInit {

  public productForm: FormGroup;


  @ViewChild('editor') public editor: ElementRef | undefined;

  public options = {
    height: 200,
    attribution: false
  }

  public isPhysicalProduct = false;

  // form builder of productVariants
  getProductVariantForm(){
    return this.formBuilder.group({
      name: ['', [Validators.required]],
      options: this.formBuilder.array([]),
      isDuplicate: false      
    });
  }

  // form builder of SKUVariants
  getSKUVariantForm(){
    return this.formBuilder.group({
      skuNumber: ['', [(fg: FormGroup) => {  
        let result: { required: boolean } | {} | null = null;
        result = Validators.required(fg);
        return fg.parent?.value.isDeleted === false ? result : null;
      }]],
      trackInventory: [0, [Validators.required, Validators.pattern('[0-9]+')]],
      unitPrice: [0, [Validators.required, Validators.pattern('[0-9]+(\\.[0-9]{1,2})?')]],
      variants: (() => this.formBuilder.array([  ]))(),
      isDeleted:  false
    });
  }


  constructor(private formBuilder: FormBuilder, private cd:ChangeDetectorRef) {
    this.productForm = this.formBuilder.group({});
  }
  
  ngOnInit(): void {

    // form builder of the entire product
    this.productForm = this.formBuilder.group({
      title: ['', Validators.required],
      code: '',
      status: ['Draft', [Validators.required]],
      description: '',
      sku: '',
      barcode: '',
      quantity: [0, [Validators.required, Validators.pattern('[0-9]+')]],
      unitCost: [0.00, [Validators.required, Validators.pattern('[0-9]+(\\.[0-9]{1,2})?')]],
      unitPrice: [0.00, [Validators.required, Validators.pattern('[0-9]+(\\.[0-9]{1,2})?')]],
      weight: [0.00, [Validators.required, Validators.pattern('[0-9]+(\\.[0-9]{1,2})?')]],
      hasVariant: false,
      categoryId: ['', [Validators.required]],
      productVariants: this.formBuilder.array([/*this.getProductVariantForm()*/]),
      SKUVariants: this.formBuilder.array([])
    });
  }

  get _title(): AbstractControl {
    return this.productForm.get('title') as AbstractControl;
  }

  get _price(): AbstractControl {
    return this.productForm.get('unitPrice') as AbstractControl;
  }

  get _quantity(): AbstractControl {    
    return (this.productForm.get('quantity') as AbstractControl);
  }

  get _cost(): AbstractControl {
    return this.productForm.get('unitCost') as AbstractControl;
  }

  get _productVariants(): FormArray {
    return this.productForm.get('productVariants') as FormArray;
  }

  get _skuVariants(): FormArray {
    return this.productForm.get('SKUVariants') as FormArray;
  }

  get _hasVariant(): FormGroup {
    return this.productForm.get('hasVariant') as FormGroup;
  }

  get _categoryId(): FormGroup {
    return this.productForm.get('categoryId') as FormGroup;
  }

  get _status(): FormGroup {
    return this.productForm.get('status') as FormGroup;
  }

  // set _weight(value: number) {
  //   this.productForm.get('weight')?.setValue(value);
  // }

  get _weight(): FormGroup {
    return this.productForm.get('weight') as FormGroup;
  }

  public setIsDeletedValue(item: AbstractControl, value: boolean){
    (item as FormControl).get('isDeleted')?.setValue(value);
    (item as FormControl)?.get('skuNumber')?.updateValueAndValidity();
  }

  getAsFormGroup(ab: AbstractControl, key: string){
    return (ab.get(key) as FormGroup);
  }

  // get form attribute casted to FormGroup
  getFormAttribute(ab: AbstractControl, key: string){
    return (ab as FormGroup).controls[key].value;
  }

  // set form attribute casted to FormGroup
  setFormAttribute(ab: AbstractControl, key: string, value: any) {
    (ab as FormGroup).controls[key].setValue(value);
  }

  toggleWeight(){
    this.isPhysicalProduct = !this.isPhysicalProduct;
    this.productForm.get('weight')?.setValue(0);
  }

  // returns variant possibility
  getSKUVariantOptionsName(index: number): string {
    const skuVariants = (this.productForm.get('SKUVariants') as FormArray);
    const result = ((skuVariants.at(index) as FormGroup).get('variants') as FormArray).value.map((variant: any) => {
      return variant['option.name']
    });

    return result.join(' / ');
  }

  // cast abstract control to FormArray.
  convertToFormArray(item: AbstractControl): FormArray {
    return item.get('variants') as FormArray;
  }

  /**
   * get the selected variant of the product (eg. variant being size, material, color of the product)  
   */
  getProductVariantOptions(index: number): string[] {
    const options = ((this._productVariants.at(index) as FormGroup).get('options') as FormArray).controls;
    return (options) ?  options.map(x => x.value) as string[] : [];
  }

  addProductVariant() {
    this._productVariants.push(this.getProductVariantForm());
  }

  removeVariant(index: number){
    if( ((this.productForm.get('productVariants') as FormArray).at(index).get('options') as FormArray).length <= 0  ){
      ((this.productForm.get('productVariants') as FormArray).removeAt(index));
      return;
    }

    ((this.productForm.get('productVariants') as FormArray).removeAt(index));

    this.recalculateSKUVariants();
  }

  // add variant option in the PeoductVariants, and recalculate the skuVariants.
  addOption(variant: AbstractControl, value: string){
    const v = ( variant as FormGroup );
    const o = v.get('options') as FormArray;

    if( o.controls.map(x => x.value).indexOf(value) !== -1 ){
      v.get('isDuplicate')?.setValue(true);
      return;
    }

    o.push( this.formBuilder.control(value) );
    this.recalculateSKUVariants();

  }

  // remove variant option in the productVariants, and recalculate the skuVariants.
  removeOption(variant: AbstractControl, index: number) {
    const v = ( variant as FormGroup );
    (v.get('options') as FormArray).removeAt(index);

    this.recalculateSKUVariants();
  }

  /**
   * Performs cartesian product on multiple arrays. 
   * literally no idea how the code works. The code is taken form stack overflow
   * link => https://stackoverflow.com/questions/12303989/cartesian-product-of-multiple-arrays-in-javascript 
   */
   private cartesian = (arr: string[][]): string[][] => {
    arr = arr.filter( x => Array.isArray(x) && x.length > 0 );
    // this one on bottom is faster
    return arr.reduce(function(a,b){
      return a.map(function(x: any){
          return b.map(function(y: any){
              return x.concat([y]);
          })
      }).reduce(function(a: any,b: any){ return a.concat(b) },[])
    }, [[]]);
  }

  // recalculate the sku variants after variant options have been changed. 
  recalculateSKUVariants(): void {

    this.cd.detach();

    // get all options array from the product variants.
    const variantOptions: string[][] = (this.productForm.get('productVariants') as FormArray).controls.map((variant: AbstractControl) => {
      return ((variant as FormGroup).get('options') as FormArray).controls.map(x => x.value).filter(x => x && x.length > 0);
    });
      
    const totalVariantCombinations: string[][] = this.cartesian(variantOptions);

    const skuVariants = (this.productForm.get('SKUVariants') as FormArray);

    for(let index = 0; index < skuVariants.controls.length;){
      let variant = (skuVariants.at(index) as FormGroup).get('variants');
      const options = (variant as FormArray).controls.map(x => (x as FormControl)?.value['option.name']);

      for(let i = 0; i < totalVariantCombinations.length; i++){
        let set = totalVariantCombinations[i];
        let a = set.length > options.length ? set : options;
        let b = set.length <= options.length ? set : options;
        if( a.filter( (element, i) =>  element === b[i]).length >= a.length ) {
          totalVariantCombinations.splice(i, 1);
          index++
          continue;
        }
      }

      (this.productForm.get('SKUVariants') as FormArray).removeAt(index);
    }

    for(let set of totalVariantCombinations){
      let skuVariant = this.getSKUVariantForm();
      for(let name of set){
        (skuVariant.get('variants') as FormArray).push(
          this.formBuilder.group({
            'variant.name': '',
            'option.name': name
          })
        )
      }
      skuVariants.push( skuVariant );
    }

    this.cd.reattach();
  }

  public trackByFn = (index: number, item: any) => item;

  onVariantToggle(event: Event){
   
    // when even fires variable "hasVaraint" is toggled.

    if ( this._hasVariant.value ){
      this._productVariants.push( this.getProductVariantForm() );
      return;
    }
    
    const clearFormArray = (formArray: FormArray) => {
      while (formArray.length !== 0) {
        formArray.removeAt(0)
      }
    }

    clearFormArray(this._productVariants);
    clearFormArray(this._skuVariants);
  }

  submit(event: Event){

    this.productForm.markAllAsTouched();

    if(this.productForm.valid){
      const productFormDto = this.productForm.value;
      const productVariants = (this.productForm.get('productVariants') as FormArray).value.map((x: {name: string}) => x.name);
  
      try{
        for(let i = 0; i < productFormDto.SKUVariants.length; i++){
          if ( productFormDto.SKUVariants[i].isDeleted ) {
            productFormDto.SKUVariants.splice(i, 1);
            continue;
          }

          // set all the variant names in skuVariant
          let variant = productFormDto.SKUVariants[i].variants;
          for(let j = 0; j < variant.length; j++){
            variant[j]['variant.name'] = productVariants[j];
          }

          delete productFormDto.SKUVariants[i].isDeleted;
        }  
        console.log(productFormDto) ;
      } catch (e) {
        console.error(e.message);
      }
  
    }
  }

}
