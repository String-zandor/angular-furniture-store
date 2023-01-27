import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../models/order';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  @Input () orders: Order[] | undefined

  orderId: any

  constructor(private route:ActivatedRoute){}

  items: Order[] | undefined

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('orderId')
    this.orderId = id

    this.items = this.orders?.filter(order =>  order.id === this.orderId)

    console.log(this.items)
    console.log(this.orders)

  }
}
