import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthGuard } from './core/guards/user-auth.guard';
import { AdminProductComponent } from './modules/product/pages/admin-product/admin-product.component';
import { SearchResultComponent } from './modules/product/pages/search-result/search-result.component';

const routes: Routes = [
  { path: 'search/:term', component: SearchResultComponent },
  {
    path: 'orders', loadChildren: () => import('./modules/order/order.module').then(m => m.OrderModule)
  },
  { path: 'profile', loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule) },
  {
    path: 'cart',
    canActivate: [UserAuthGuard],
    loadChildren: () => import('./modules/cart/cart.module').then(m => m.CartModule)
  },
  { path: '', loadChildren: () => import('./modules/product/product.module').then(m => m.ProductModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [UserAuthGuard]
})
export class AppRoutingModule { }
