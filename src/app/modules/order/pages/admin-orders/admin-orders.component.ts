import { Component, OnInit } from '@angular/core';
import { switchMap, of } from 'rxjs';
import { CartItem } from 'src/app/modules/cart/models/cart-item';
import { AuthService } from 'src/app/modules/user/services/auth.service';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {

  panelOpenState = false;

  orders: Order[] = [];
  items: CartItem[] = [];

constructor(private orderService: OrderService,
  private auth: AuthService){}

  ngOnInit(): void {
        this.auth.admin$.pipe(
      switchMap(admin => {
          return (admin?.id) ? this.orderService.getAllOrders() : of(null);
      })
    ).subscribe(order => this.orders = order!);
  }
}
