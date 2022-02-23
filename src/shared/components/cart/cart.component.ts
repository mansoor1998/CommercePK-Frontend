import { Component, ContentChild, ContentChildren, ElementRef, EventEmitter, HostListener, OnInit, Output, QueryList } from '@angular/core';


@Component({
  selector: 'app-cart-item',
  template: `
    <div class="wrapper-box-border-bottom p-2">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./cart.component.css']
})
export class CartItemComponent {
}


@Component({
  selector: 'app-cart-list',
  template: `
    <ng-content select="app-cart-item"></ng-content>
  `,
})
export class CartListComponent implements OnInit {
  @ContentChildren(CartItemComponent)
  _items: QueryList<CartItemComponent> | undefined;
  constructor() { }
  ngOnInit(): void {
  }

  ngAfterContentInit() {
    // console.log('content of the data', this._items);
    if (this._items && this._items?.length === 0)
      throw new Error('please provide content inside the element ' + 'app-cart-list');
  }
}


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  @Output() closeEvent = new EventEmitter<void>();
  constructor(private host: ElementRef) { }

  // @HostListener('document:click', ['$event'])
  // clickout(event: Event): void {
  //   console.log(event.target && !this.host.nativeElement.contains(event.target));
  //   if (event.target && !this.host.nativeElement.contains(event.target)) {
  //     this.closeEvent.emit(event.target);
  //   }
  // }

  ngOnInit(): void {
  }

}
