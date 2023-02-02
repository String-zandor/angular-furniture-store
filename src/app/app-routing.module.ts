import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetPwdGuard } from './core/guards/reset-pwd.guard';
import { UserAuthGuard } from './core/guards/user-auth.guard';
import { SearchResultComponent } from './modules/product/pages/search-result/search-result.component';
import { ForgotPasswordComponent } from './modules/user/pages/forgot-password/forgot-password.component';

//New import
import { RegisterComponent } from './modules/user/pages/register/register.component';
import { ResetPasswordComponent } from './modules/user/pages/reset-password/reset-password.component';
import { PagenotfoundComponent } from './shared/pages/pagenotfound/pagenotfound.component';

const routes: Routes = [
  { path: 'search/:term', component: SearchResultComponent },
  { path: 'search', component: SearchResultComponent },
  {
    path: 'orders', loadChildren: () => import('./modules/order/order.module').then(m => m.OrderModule)
  },
  { path: 'profile', loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule) },
  {
    path: 'cart',
    canActivate: [UserAuthGuard],
    loadChildren: () => import('./modules/cart/cart.module').then(m => m.CartModule)
  },
  { path: '', loadChildren: () => import('./modules/product/product.module').then(m => m.ProductModule) },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', canActivate: [ResetPwdGuard], component: ResetPasswordComponent },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
