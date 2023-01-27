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

  products$?: Observable<Product[]>
  results?: Observable<Product[]>
  searchTerm: any;
  resultItems?: Product[] 

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.products$ = this.productService.getProducts()
    const term = this.route.snapshot.paramMap.get('term');
    this.searchTerm = (term?.trim());
    this.searchTerm ? this.searchProduct(this.searchTerm) : this.router.navigate(['/home']);

    console.log(this.resultItems)

  }

  searchProduct(keyword: any) {

    this.products$!.subscribe((product: Product[]) => {
      this.resultItems = product.filter((product: Product) => product.name.toLowerCase().includes(keyword.toLowerCase()) || product.category.toLowerCase().includes(keyword.toLowerCase()) ||
        product.description.desc.toLowerCase().includes(keyword.toLowerCase())
      )
      this.results = of(this.resultItems)
    })
  }

//   addToCart(cartItem: CartItem): void {
//     this.cartService.getCartItemOfProduct(cartItem.product.id).subscribe((item) => {
//       if (item) {
//         item.qty += cartItem.qty;
//         this.cartService.update(item).subscribe();
//       } else {
//         this.cartService.create(cartItem).subscribe();
//       }
//     });
// 

}