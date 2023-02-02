import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PendingOrdersComponent } from './pages/pending-orders/pending-orders.component';
import { OrderRoutingModule } from './order-routing.module';
import { AdminOrdersComponent } from './pages/admin-orders/admin-orders.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    PendingOrdersComponent,
    AdminOrdersComponent,
    OrderDetailsComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
    
  ],
  exports: [
    PendingOrdersComponent,
    OrderDetailsComponent    
  ]
})
export class OrderModule { }
