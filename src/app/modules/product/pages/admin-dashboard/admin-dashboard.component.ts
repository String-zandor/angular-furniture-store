import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, of, Subscription } from 'rxjs';
import { CartItem } from 'src/app/modules/cart/models/cart-item';
import { Order } from 'src/app/modules/order/models/order';
import { OrderItem } from '../../models/order-item';
import { AdminOrderService } from '../../services/admin-order.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {

  constructor(private adminOrderService: AdminOrderService){}
  

  orderItems:OrderItem [] = []
  orderItemsTop5:OrderItem [] = []
  subscribe:Subscription[]=[]

  ngOnInit(): void {
    this.getOrders()
  }
  ngOnDestroy(): void {
    for(let sub of this.subscribe){
      sub.unsubscribe()
    }
  }

  getOrders(){
    this.subscribe.push(this.adminOrderService.getProducts().pipe(
      map((order:Order[]) => {
        order.forEach((orderProduct:Order)=>{
          orderProduct.cart.forEach((orderItem:CartItem)=>{
            let item:OrderItem = {
              productId:orderItem.product.id,
              productName:orderItem.product.name,
              productQty:orderItem.qty
            }
            let found = this.orderItems.find(items => items.productId === item.productId)
            if(found){
              for(let i = 0; i < this.orderItems.length; i++){
                if(this.orderItems[i].productId == item.productId){
                  this.orderItems[i].productQty += item.productQty
                  break
                }
              }
            }else{
              this.orderItems.push(item);
            }
          })
        })
        this.orderItems.sort((a:OrderItem, b:OrderItem)=>{
          return ((a['productQty'] == b['productQty']) ? 0 : ((a['productQty'] > b['productQty']) ? -1 : 1));
        })
        this.orderItemsTop5 = this.orderItems.slice(0,5)
      })
    ).subscribe())
  }




}
