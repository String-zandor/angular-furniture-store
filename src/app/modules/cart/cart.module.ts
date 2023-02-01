import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { CartRoutingModule } from './cart-routing.module';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { CheckoutItemComponent } from './components/checkout-item/checkout-item.component';
import { CartListComponent } from './pages/cart-list/cart-list.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    CartListComponent,
    CartItemComponent,
    CheckoutComponent,
    CheckoutItemComponent,
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    CartRoutingModule,
    ReactiveFormsModule,
    MatDividerModule, 
    MatStepperModule, 
    MatFormFieldModule, 
    MatButtonModule,
    MatRadioModule
  ],
  exports:[],
})
export class CartModule { }
