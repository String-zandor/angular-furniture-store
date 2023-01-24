import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from '../../models/cart-item';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit, OnDestroy {

  cartList: CartItem[] = [];

  constructor(private cartService: CartService) {}
  
  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(cartList => this.cartList = cartList);
  }

  /**
   * TODO:
   * @param data: change to { cartItem: CartItem, action: string }
   */
  onAction(data: { cartItem: CartItem, action: string }): void {
    switch(data.action) {
      case 'REMOVE': this.removeFromCart(data.cartItem);
        break; 
      case 'UPDATE':
        break;
      default: break;
    }
  }

  removeFromCart(cartItem: CartItem): void {
    if (cartItem.id) {
      this.cartService.delete(cartItem.id).subscribe(cartItem => {
        if (cartItem) {
          this.cartList = this.cartList.filter(item => item.id === cartItem.id);
        }
      });
    }
  }

  /**
   * TODO: unsubscribe from any subscriptions
   */
  ngOnDestroy(): void {
    
  }
}
