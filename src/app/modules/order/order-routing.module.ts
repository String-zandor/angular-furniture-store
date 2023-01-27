import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PendingOrdersComponent } from './pages/pending-orders/pending-orders.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';

const routes: Routes = [
  { path: '', 
  component: PendingOrdersComponent },
  {
    path: ':orderId', component: OrderDetailsComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
