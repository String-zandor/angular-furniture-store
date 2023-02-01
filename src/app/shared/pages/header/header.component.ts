import { Component, OnInit } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { CartService } from 'src/app/modules/cart/services/cart.service';
import { Product } from 'src/app/modules/product/models/product';
import { ProductService } from 'src/app/modules/product/services/product.service';
import { AuthService } from 'src/app/modules/user/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  showFiller = false;

  cartTotal$?: Observable<number>;
  allProducts?: Product[]
  isLoggedAsAdmin$?: Observable<boolean>;

  constructor(
    private cartSvc: CartService,
    private auth: AuthService) { }

  ngOnInit(): void {
    this.cartTotal$ = this.auth.user$.pipe(
      tap(() => this.cartSvc.getCartItems().subscribe()),
      switchMap(() => this.cartSvc.getNoOfItems())
    )
    this.isLoggedAsAdmin$ = this.auth.isLoggedAsAdmin$;
  }
}
