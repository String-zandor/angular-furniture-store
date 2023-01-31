import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { CartItem } from 'src/app/modules/cart/models/cart-item';
import { Product } from 'src/app/modules/product/models/product';
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
  userId = 1
 

  constructor(private orderService: OrderService,
    private router: Router, private auth: AuthService) { }


  ngOnInit(): void {
    this.auth.user$.pipe(
      switchMap(user => {
          return (user?.id) ? this.orderService.getOrders(user.id) : of(null);
      })
    ).subscribe(orders => this.orders = (orders) ? orders : [] );
    console.log(this.orders)
  }

  onClick(orderId: number) {
    this.router.navigate([`orders/${orderId}`])

  }
}
