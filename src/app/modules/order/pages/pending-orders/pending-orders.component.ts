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
  items: Product[] = [];
  cart: CartItem[] = [];

  td = document.createElement('td');

  constructor(private orderService: OrderService,
    private router: Router) {

  }


  ngOnInit(): void {

    this.orderService.getOrders(1).subscribe(order => {
      this.orders = order

      console.log(this.cart)
      this.showOrders()

    }
    )

  }



  showOrders() {

    this.orders.forEach(order => {
      this.showOrderNumber(order.id)
      // order.cart.forEach(item =>{
      //   this.showItems(item.product.name, item.qty) 
      // })
      this.showStatus(order.status)
      this.showTotal(order.total, order.cart.map(item => item.qty).reduce((partialSum, a) => partialSum + a, 0))
      this.showDateOrdered(order.orderDate)
      this.view(order.id)
    })

  }


  showOrderNumber(orderId: any) {
    let tr = document.createElement('tr');
    tr.innerText = "#" + orderId
    document.getElementById('orderId')?.appendChild(tr)
  }

  showTotal(total: any, qty: any) {
    let tr = document.createElement('tr');
    tr.innerText = "PHP " + total
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
    let tr = document.createElement('div');
    tr.innerText = item + "   x" + qty
    document.getElementById('items')?.appendChild(tr)
  }

  view(orderId: any) {
    let tr = document.createElement('tr');
    tr.innerText = "view order"
    document.getElementById('view')?.appendChild(tr)
    document.getElementById('view')!.onclick = () => {
      this.router.navigate([`orders/${orderId}`])
  }
}
}
