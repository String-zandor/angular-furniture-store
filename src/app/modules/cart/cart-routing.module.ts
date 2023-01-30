import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutGuard } from 'src/app/core/guards/checkout.guard';
import { CartListComponent } from './pages/cart-list/cart-list.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

const routes: Routes = [
  { path: '', component: CartListComponent },
  { path: 'checkout', canActivate: [CheckoutGuard],canDeactivate: [CheckoutGuard], component: CheckoutComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CheckoutGuard]
})
export class CartRoutingModule { }
