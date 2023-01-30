import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartListComponent } from './pages/cart-list/cart-list.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckoutComponent, DialogProceedCheckout } from './pages/checkout/checkout.component';
import { CheckoutItemComponent } from './components/checkout-item/checkout-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    CartListComponent,
    CartItemComponent,
    CheckoutComponent,
    CheckoutItemComponent,
    
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    ReactiveFormsModule,
  ],
  exports:[
    // CartModule
  ],
})
export class CartModule { }
