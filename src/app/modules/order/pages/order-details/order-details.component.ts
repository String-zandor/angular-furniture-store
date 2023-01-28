import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'src/app/modules/cart/models/cart-item';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  items?: CartItem[]
  orderId: any
  deliveryFee: any
  subtotal: any
  orderTotal?: any
  orderStatus?: any
  userId = 1

  constructor(private route:ActivatedRoute,
    private router: Router,
    private orderService: OrderService){}

  ngOnInit(): void {
    this.orderService.getOrders(this.userId).subscribe(order => {
      let id = parseInt(this.route.snapshot.paramMap.get('orderId')!)
      this.orderId = id
      order.filter(order => order.id ===id).forEach(item => {
        this.items = item.cart
        this.orderTotal = item.total
        this.orderStatus = item.status
        this.subtotal = item.subtotal
        this.deliveryFee = item.deliveryfee
      })
    })
  }

  goBack(){
    this.router.navigate(["orders"])
  }
}
