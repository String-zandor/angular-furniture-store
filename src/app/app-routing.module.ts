import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchResultComponent } from './modules/product/pages/search-result/search-result.component';

const routes: Routes = [
  { path: 'orders', loadChildren: () => import('./modules/order/order.module').then (m => m.OrderModule) },
  { path: 'profile', loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule) },
  { path: 'cart', loadChildren: () => import('./modules/cart/cart.module').then(m => m.CartModule) },
  { path: 'home', loadChildren: () => import('./modules/product/product.module').then(m => m.ProductModule) },
  { path: 'search/:term', component: SearchResultComponent }, //test
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
