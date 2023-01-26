import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: 'cart', 
    loadChildren: () => import('./modules/cart/cart.module').then(m => m.CartModule) 
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/product/product.module').then(mod => mod.ProductModule)
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'orders',
    loadChildren: () => import('./modules/order/order.module').then (m => m.OrderModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
