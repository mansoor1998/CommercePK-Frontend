import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products/products.component';
import { InventoryComponent } from './inventory/inventory.component';
import { RouterModule } from '@angular/router';
import { NewProductComponent } from './new-product/new-product.component';

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { ShareModule } from 'src/shared/share.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    ProductsComponent,
    InventoryComponent,
    NewProductComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    RouterModule,
    ShareModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    NgxPaginationModule
  ]
})
export class ProductsModule { }
