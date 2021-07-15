import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryComponent } from './inventory/inventory.component';
import { NewProductComponent } from './new-product/new-product.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [

  {
    path: '',
    component: ProductsComponent,
    data: { animation: 'ProductsComponent' }
  },
  {
    path: 'new',
    component: NewProductComponent,
    data: { animation: 'NewProductComponent' }
  },
  {
    path: 'inventory',
    component: InventoryComponent,
    data: { animation: 'InventoryComponent' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
