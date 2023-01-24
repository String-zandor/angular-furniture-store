import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartListComponent } from './pages/cart-list/cart-list.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CartListComponent,
    CartItemComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    ReactiveFormsModule
  ]
})
export class CartModule { }
