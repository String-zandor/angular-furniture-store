import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PendingOrdersComponent } from './pages/pending-orders/pending-orders.component';
import { OrderRoutingModule } from './order-routing.module';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';





@NgModule({
  declarations: [
    PendingOrdersComponent,
    OrderDetailsComponent,
  ],
  imports: [
    CommonModule,
    OrderRoutingModule
    
  ],
  exports: [
    PendingOrdersComponent,
    OrderDetailsComponent
  ]
})
export class OrderModule { }
