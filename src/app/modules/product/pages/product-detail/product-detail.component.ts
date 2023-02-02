import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription, switchMap } from 'rxjs';
import { CartItem } from 'src/app/modules/cart/models/cart-item';
import { CartService } from 'src/app/modules/cart/services/cart.service';
import { User } from 'src/app/modules/user/models/user';
import { AuthService } from 'src/app/modules/user/services/auth.service';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  product?: Product;
  qtyCtrl = new FormControl(1);
  currentVal: number = 1;
  user: User | null = null;
  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productSvc: ProductService,
    private cartSvc: CartService,
    private auth: AuthService,
    private snackBar: MatSnackBar,
    private location: Location) {

  }

  ngOnInit(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    if (!Number.isNaN(id)) {
      this.productSvc.getProduct(id).subscribe(product => this.product = product);

      const sub1 = this.qtyCtrl.valueChanges.subscribe(value => {
        this.currentVal = Number(value);
      });

      const sub2 = this.auth.user$.subscribe(user => this.user = (user) ? user : null);

      this.subscriptions.push(sub1);
      this.subscriptions.push(sub2);
    } else {
      this.router.navigate(['/home']);
    }
  }

  increment(): void {
    if (this.currentVal < 1) {
      this.currentVal = 0;
    }
    this.qtyCtrl.setValue(this.currentVal + 1);
  }

  decrement(): void {
    if (this.currentVal > 1) {
      this.qtyCtrl.setValue(this.currentVal - 1);
    }
  }

  addToCart(): void {
    if (this.product && this.user) {
      const cartItem: CartItem = { product: this.product, qty: this.currentVal };
      this.cartSvc.getCartItemOfProduct(cartItem.product.id).pipe(
        switchMap(item => {
          if (item) {
            item.qty += cartItem.qty;
            return this.cartSvc.update(item);
          } else {
            return this.cartSvc.create(cartItem);
          }
        }),
        switchMap(item => (item) ? this.cartSvc.getCartItems() : of(null))
      ).subscribe(items => {
        if (items) {
          this.snackBar.open('Added to cart sucessfully.', '', {
            duration: 1000, verticalPosition: 'top',
            horizontalPosition: 'right'
          });
        }
      });

    } else {
      this.router.navigate(['/profile/login']);
    }
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

}
