import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: 'cart', 
    loadChildren: () => import('./modules/cart/cart.module').then(m => m.CartModule) 
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/product/product.module').then(m=> m.ProductModule)
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
