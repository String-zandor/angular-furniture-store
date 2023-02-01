import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartListComponent } from './pages/cart-list/cart-list.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckoutComponent, DialogProceedCheckout } from './pages/checkout/checkout.component';
import { CheckoutItemComponent } from './components/checkout-item/checkout-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';

import { PromptModule } from 'src/app/shared/prompt/prompt.module';

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
    MatDividerModule, 
    MatStepperModule, 
    MatFormFieldModule, 
    MatButtonModule,
    MatRadioModule, 
    PromptModule
  ],
  exports:[
    // CartModule
  ],
})
export class CartModule { }
