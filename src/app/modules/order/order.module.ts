import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PendingOrdersComponent } from './pending-orders/pending-orders.component';
import { OrderRoutingModule } from './order-routing.module';



@NgModule({
  declarations: [
    PendingOrdersComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    
  ]
})
export class OrderModule { }
