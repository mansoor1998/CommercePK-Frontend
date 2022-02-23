import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent, InputErrorComponenet } from './components/input/input.component';
import { ChipComponent, ChipsComponent } from './components/chips/chips.component';
import { CartComponent, CartItemComponent, CartListComponent } from './components/cart/cart.component';
import { CounterComponent } from './components/counter/counter.component';
import { SlideToggleComponent } from './components/slide-toggle/slide-toggle.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { NgxPaginationModule } from 'ngx-pagination';
// import {  } from './directive/matmenufor.directive';
import { MenuComponent, MenuListComponent } from './components/menu/menu.component';

@NgModule({
  declarations: [
    InputComponent,
    InputErrorComponenet,
    ChipsComponent,
    ChipComponent,
    CartComponent,
    CartListComponent,
    CartItemComponent,
    CounterComponent,
    SlideToggleComponent,
    PaginationComponent,
    // MatmenuforDirective,
    MenuComponent,
    MenuListComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
  ],
  entryComponents: [
  ],
  exports: [
    InputComponent,
    InputErrorComponenet,
    ChipsComponent,
    ChipComponent,
    CounterComponent,
    CartComponent,
    CartListComponent,
    CartItemComponent,
    SlideToggleComponent,
    PaginationComponent,
    // MatmenuforDirective,
    MenuComponent,
    MenuListComponent
  ]
})
export class ShareModule { }