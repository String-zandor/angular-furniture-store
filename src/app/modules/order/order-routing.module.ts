import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PendingOrdersComponent } from './pages/pending-orders/pending-orders.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { AdminOrdersComponent } from './pages/admin-orders/admin-orders.component';

const routes: Routes = [

  {path: 'admin/orders', component: AdminOrdersComponent},
  {path: ':orderId', component:PendingOrdersComponent}, 
  { path: '', component: PendingOrdersComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
