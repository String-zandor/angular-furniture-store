import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/modules/cart/services/cart.service';
import { Product } from 'src/app/modules/product/models/product';
import { ProductService } from 'src/app/modules/product/services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  cartTotal$?: Observable<number>;
  allProducts?: Product[]

  constructor(private cartService: CartService,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe();
    this.cartTotal$ = this.cartService.getNoOfItems();

    this.productService.getProducts().subscribe((product => this.allProducts = product))
  }
}
