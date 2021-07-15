import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { Book } from './book';
import { GenericComponent } from './generic.component';
import { Person } from './Person';

const routes: Routes = [
  {
    path: 'admin',
    children: [
      {
        path: 'products',
        loadChildren: () => import('./products/products.module').then(x => x.ProductsModule),
      }
    ]
  },
  // {
  //   path: '**',
  //   redirectTo: ''
  // }
  // {
  //   path: '',
  //   component: AppComponent,
  //   pathMatch: 'full'
  // },
  // {
  //   path: 'book',
  //   component: GenericComponent,
  //   data: { Class: Book }
  // },
  // {
  //   path: 'person',
  //   component: GenericComponent,
  //   data: { Class: Person }
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
