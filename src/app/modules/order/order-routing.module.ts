import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PendingOrdersComponent } from './pending-orders/pending-orders.component';

const routes: Routes = [
  { path: '', 
  component: PendingOrdersComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
