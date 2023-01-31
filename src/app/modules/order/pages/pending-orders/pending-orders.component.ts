import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/modules/user/services/auth.service';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.scss']
})
export class PendingOrdersComponent implements OnInit {

  orders: Order[] = [];
  orderID?: number

  
  constructor(private orderService: OrderService,
    private router: Router, private auth: AuthService) { }


    dateFormatted?: Date;

  ngOnInit(): void {
    this.auth.user$.pipe(
      switchMap(user => {
          return (user?.id) ? this.orderService.getOrders(user.id) : of(null);
      })
    ).subscribe(orders => this.orders = (orders) ? orders : []);
  }
}
