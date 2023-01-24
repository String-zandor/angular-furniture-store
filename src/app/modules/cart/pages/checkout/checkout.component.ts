import { Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, of, Subscription, switchMap } from 'rxjs';
import { CartItem } from '../../models/cart-item';
import { OrderItem } from '../../models/order-item';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {

  constructor(private cartService : CartService, private orderService:OrderService){}
  
  cartItems:CartItem[] = [];
  totalAmmountToPay?:number
  subscriptions:Subscription[]=[]
  ngOnInit(): void {
    this.loadCartItems()
  }
  ngOnDestroy(): void {
    for(let subs of this.subscriptions){
      subs.unsubscribe()
    }
  }
  
  loadCartItems(): void {
    let sub:Subscription =  this.cartService.getCartItems().subscribe((items:CartItem[]) => {
      this.cartItems = items;
      this.getTotalToPrice(items)
    })
    this.subscriptions.push(sub)
  }

  getTotalToPrice(cartItems:CartItem[]){
    var total:number = 0
    for(let amount of cartItems){
      total += amount.product.price * amount.qty
    }
    this.totalAmmountToPay = total
  }

  displayCart(){
    console.log(this.cartItems)
  }

  proceedCheckout(){
    if(this.cartItems.length > 0){
      this.saveToOrderDB()
      this.cartItems.forEach((item:CartItem)=> {
      this.deleteCartItem(item.id as number)
    })
    }
    
  }
  deleteCartItem(id:number){
    let sub:Subscription = this.cartService.delete(id).pipe(
      //this will update the UI when deleting a blog item
      switchMap(async () => this.loadCartItems()),catchError(_err => of (null))).subscribe()
    this.subscriptions.push(sub)
  }
  saveToOrderDB(){
    let orderItem:OrderItem ={
      status: 'pending',
      cart: this.cartItems
    }
    let sub:Subscription = this.orderService.create(orderItem).subscribe()
    this.subscriptions.push(sub)
  }

}
