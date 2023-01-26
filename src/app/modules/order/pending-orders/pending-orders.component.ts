import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.scss']
})
export class PendingOrdersComponent implements OnInit {

  orders: Order[] = [];
  td = document.createElement('td');

  constructor(private orderService: OrderService) {

  }


  ngOnInit(): void {


    // this.orderService.getOrders(1).subscribe(order => this.orderss = order)
    // console.log(this.orderss)

    this.orderService.getOrders(1).subscribe(order => {
      this.orders = order
      this.showOrders()

    }
    )

  }



  showOrders() {

    this.orders.forEach(order => {
      this.showOrderNumber(order.id)
      order.cart.forEach(item => {
        this.showItems(item.product.name, item.qty)
      })
      this.showStatus(order.status)
      this.showTotal(order.total, order.cart.map(item => item.qty).reduce((partialSum, a) => partialSum + a, 0))
      this.showDateOrdered(order.orderDate)
      this.view()
    })

  }


  showOrderNumber(orderId: any) {
    let tr = document.createElement('tr');
    tr.innerText = "#" + orderId
    document.getElementById('orderId')?.appendChild(tr)
  }

  showTotal(total: any, qty: any) {
    let tr = document.createElement('tr');
    tr.innerText = "PHP " + total + " for " + qty + " items"
    document.getElementById('total')?.appendChild(tr)
  }

  showStatus(status: any) {
    let tr = document.createElement('tr');
    tr.innerText = status
    document.getElementById('status')?.appendChild(tr)
  }

  showDateOrdered(date: any) {
    let tr = document.createElement('tr');
    tr.innerText = date
    document.getElementById('dateOrdered')?.appendChild(tr)
  }

  showItems(item: any, qty: any) {
    let tr = document.createElement('tr');
    tr.innerText = item + "   x" + qty
    document.getElementById('itemName')?.appendChild(tr)
  }

  view() {
    let tr = document.createElement('tr');
    tr.innerText = "view ???????"
    document.getElementById('view')?.appendChild(tr)
  }
}
