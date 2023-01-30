import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartItem } from 'src/app/modules/cart/models/cart-item';
import { Product } from 'src/app/modules/product/models/product';
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
    private router: Router) { }


  ngOnInit(): void {

    this.orderService.getOrders(this.userId).subscribe(order => {
      this.orders = order;
    })

    console.log(this.orders)
  }

  onClick(orderId: number) {
    this.router.navigate([`orders/${orderId}`])

  }
}
