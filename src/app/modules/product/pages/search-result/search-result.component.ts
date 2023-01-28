import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CartItem } from 'src/app/modules/cart/models/cart-item';
import { CartService } from 'src/app/modules/cart/services/cart.service';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  results$?: Observable<Product[]>
  results: Product[] | undefined
  searchTerm: any;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router) { }



  ngOnInit(): void {
    const term = this.route.snapshot.paramMap.get('term');
    this.searchTerm = (term?.trim());
    this.searchTerm ? this.searchProduct(this.searchTerm) : this.router.navigate(['/home']);
  }


  searchProduct(keyword: any) {

    this.productService.getProducts().subscribe((product: Product[]) => {
      this.results = product.filter((product: Product) => product.name.toLowerCase().includes(keyword.toLowerCase() as string) || product.category.toLowerCase().includes(keyword.toLowerCase() as string) ||
        product.description.desc.toLowerCase().includes(keyword.toLowerCase() as string)
      )
      this.results$ = of(this.results)
    })
  }

  addToCart(cartItem: CartItem): void {
    this.cartService.getCartItemOfProduct(cartItem.product.id).subscribe((item) => {
      if (item) {
        item.qty += cartItem.qty;
        this.cartService.update(item).subscribe();
      } else {
        this.cartService.create(cartItem).subscribe();
      }
      this.cartService.getCartItems().subscribe();
    });
  }

}