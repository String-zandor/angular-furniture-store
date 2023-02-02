import { Component, OnDestroy, OnInit } from '@angular/core';
import { from, groupBy, map, mergeMap, of, Subscription, switchMap, take, toArray } from 'rxjs';
import { CartItem } from 'src/app/modules/cart/models/cart-item';
import { Order } from 'src/app/modules/order/models/order';
import { OrderService } from 'src/app/modules/order/services/order.service';
import { OrderItem } from '../../models/order-item';
import { Product } from '../../models/product';
import { AdminOrderService } from '../../services/admin-order.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private orderSvc: OrderService){}

  topFive:OrderItem [] = [];

  ngOnInit(): void {
    this.getBestsellers();
  }

  getBestsellers() {
    this.orderSvc.getAllOrders().pipe(
      mergeMap(orders => {
        return from(orders).pipe(
          switchMap(order => from(order.cart))
        )
      }),
      groupBy(item => item.product.id),
      mergeMap(group => group.pipe(toArray())),
      mergeMap(itemArray => {
        const item: OrderItem = { totalBuys: 0 };
        itemArray.forEach(cartItem => {
          item.product = cartItem.product;
          item.totalBuys += cartItem.qty;
        })
        return of(item);
      }),
      toArray(),
      map(items => items.sort((itemA, itemB) => (itemA.totalBuys - itemB.totalBuys) * (-1))),
      switchMap(items => from(items)),
      take(5),
      toArray(),
    ).subscribe(orderItems => this.topFive = orderItems);
  }




}
