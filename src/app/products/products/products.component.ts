import { animate, animation } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { appModuleAnimation } from 'src/shared/animations/routerTransition';
import { Product, STATUS } from 'src/shared/services/product/product.dto';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [appModuleAnimation()]
})
export class ProductsComponent implements OnInit {

  public products: Product[] = [];
  public filters = {
    search: '',
    status: new Set()
  }
  public open = false;
  public selectedProductCount = 0;
  public p: number = 1;
  public items: number[] = [1, 2, 3, 4, 5, 56, 7, 7];

  public show = false;

  // if at least one of the product is checked.
  public isProductChecked = false;

  public chips = [{ name: 'mansoor' }, { name: 'saad' }, { name: 'mansoor' }, { name: 'hamza' }, { name: 'mansoor' }];

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    // loader is shown, but when loaded it is removed.
    setTimeout(() => { this.show = true; console.log('show is true'); this.cd.markForCheck() }, 500);

    // assuming that this is a subscription
    this.products = [
      {
        id: '',
        title: 'product One',
        status: STATUS.DRAFT,
        inventory: 100,
        type: 'Product',
        vendor: 'Mansoor',
        imgUrl: '',
        selected: false
      },
      {
        id: '',
        title: 'product One',
        status: STATUS.DRAFT,
        inventory: 100,
        type: 'Product',
        vendor: 'Mansoor',
        imgUrl: '',
        selected: false
      },
      {
        id: '',
        title: 'product One',
        status: STATUS.DRAFT,
        inventory: 100,
        type: 'Product',
        vendor: 'Mansoor',
        imgUrl: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/demo-4/img/1.3b312012.png',
        selected: false
      },
      {
        id: '',
        title: 'product One',
        status: STATUS.DRAFT,
        inventory: 100,
        type: 'Product',
        vendor: 'Mansoor',
        imgUrl: '',
        selected: false
      },
      {
        id: '',
        title: 'product One',
        status: STATUS.DRAFT,
        inventory: 100,
        type: 'Product',
        vendor: 'Mansoor',
        imgUrl: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/demo-4/img/1.3b312012.png',
        selected: false
      },
      {
        id: '',
        title: 'product One',
        status: STATUS.DRAFT,
        inventory: 100,
        type: 'Product',
        vendor: 'Mansoor',
        imgUrl: '',
        selected: false
      }
    ]
  }

  public selectAllProducts() {
    this.isProductChecked = (this.products?.find(p => !p.selected)) ? true : false;
    this.products.forEach(x => x.selected = this.isProductChecked);
    this.selectedProductCount = this.products.length;
  }

  public onProdcutChecked() {
    const productCount = this.products.filter(x => x.selected).length;
    this.selectedProductCount = productCount;
    this.isProductChecked = productCount == this.products.length ? true : false;
  }

  public productSelected(): boolean {
    return !this.products.some(x => x.selected);
  }

  public add(value: string) {
    this.chips.push({ name: value });
  }

  public remove(item: any) {
    let index = this.chips.findIndex(x => x === item);
    this.chips.splice(index, 1);
  }


}
