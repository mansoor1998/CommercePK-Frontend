import { AfterViewInit, Component, ContentChildren, ElementRef, OnInit, Output, QueryList, ViewChild, HostListener, EventEmitter, AfterContentInit, AfterContentChecked, SimpleChange, Input, ChangeDetectionStrategy } from '@angular/core';
import { fromEvent } from 'rxjs';




@Component({
  selector: 'chip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="content">
      <!--Content project hoga input wala-->
      <span>{{name}}</span>
      <i class="far fa-times-circle" (click)="remove($event)"></i>
    </span>
  `,
  styles: [
    `
      .content {
        background-color: #e4e5e7;
        padding: 5px;
        margin-left: 5px;
        margin-right: 5px;
        margin-top: 5px;
        margin-bottom: 5px;
        border-radius: 4px;
        color: black;
        font-weight: bold;
        display: inline-block;
      }
      .content i {
        cursor: pointer;
        margin-top: 2px;
      }

      .content span:first-child {
        margin-right: 5px;
      }
    `
  ]
})
export class ChipComponent {

  @Input() name: string | number | boolean | null | undefined;
  @Output() removeChip: EventEmitter<void> = new EventEmitter<void>(); 

  remove(event: MouseEvent){
    event.stopPropagation();
    this.removeChip.emit();
  }

} 



@Component({
  selector: 'app-chips',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template:
    `
      <div class="chip-body" style="cursor: text;" [ngClass]="{ 'error': error }">
        <div class="chip-array">
          <ng-content select="chip"></ng-content>
        </div> 
        
        <div class="input-block" #input>
          <ng-content select="input"></ng-content>
        </div> 
      </div>
    
    `
  ,
  styles: [
    `
      .chip-body {
        position: relative;
        border: 1px solid #404656;
        border-radius: 5px;
        overflow: hidden;
        padding-top: 5px;
        padding-bottom: 5px;
        padding-right: 10px;
        padding-left: 10px;
        outline: none;
        width: 100%;
      }

      .error {
        border: 1px solid #dc3545;
      }
      
      .chip-array {
        overflow: hidden;
      }

      .input-block { 
        /*margin-top: 5px;*/
      }

      .focus-shadow {
        box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 25%);
      }

      :host ::ng-deep .input-block input {
        border: none;
        background: none;
        width: 100%;
        display: inline-block;
        background: transparent;
        outline-width: 0;
      }

      :host ::ng-deep .input-block input:focus {
        border: none;
        background: none;
        background: transparent;
        outline-width: 0;

      }
    `
  ]
})
export class ChipsComponent implements OnInit, AfterViewInit {

  // @ContentChildren(ChipComponent) chips: QueryList<ChipComponent> | undefined;
  @ViewChild('input') input: ElementRef | undefined;
  
  @Input('error') error: boolean = false;
  
  @Output() chipInput: EventEmitter<any> = new EventEmitter<any>();
  @Output() removeChip: EventEmitter<any> = new EventEmitter<any>();

  // public _chipRef: { id: number, chip: ChipComponent }[] | undefined;


  constructor(private elementRef: ElementRef) { }
  
  
  ngOnInit(): void {
    
  }

  @HostListener('click')
  onClick() {
    const inputElement = this.input?.nativeElement.childNodes[0];
    inputElement.focus();
  }

  ngAfterViewInit(): void {
    const inputElement = this.input?.nativeElement.childNodes[0];

    fromEvent(inputElement, 'keypress').subscribe((e: any): boolean | any => {
      if(e.key === 'Enter' || e.key === ',') {
        if(e.target.value !== '')
          this.chipInput?.emit(e.target.value);
        e.target.value = '';
        e.preventDefault();
      }
    });

    (inputElement as HTMLElement).onfocus = (e: any) => {
      this.elementRef.nativeElement.childNodes[0].classList.add('focus-shadow');
    }
    (inputElement as HTMLElement).onblur = (e: any) => {
      this.elementRef.nativeElement.childNodes[0].classList.remove('focus-shadow');
    }
  }
}
