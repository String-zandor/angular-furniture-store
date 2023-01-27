import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Product } from '../../models/product';
import { DisplayService } from '../../services/display.service';
import { ProductService } from '../../services/product.service';

@Component({
  templateUrl: './admin-product-list.component.html',
  styleUrls: ['./admin-product-list.component.scss']
})
export class AdminProductListComponent implements OnInit {

  productsDisplay$?: Observable<Product[]>;
  productsToSort$?: Observable<Product[]>;
  allProducts$?: Observable<Product[]>;

  constructor(
    private productService: ProductService,
    private displayService: DisplayService,
    private router: Router,
    private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.productsDisplay$ = this.displayService.productsDisplay$;
    this.allProducts$ = this.displayService.displayAllProducts();
    this.productsToSort$ = this.displayService.productsToSort$;
  }
 
  onAction(data: { id: number, action: string }): void {
    switch (data.action) {
      case 'EDIT': this.edit(data.id);
      break;
      case 'DELETE': this.deleteProduct(data.id);
      break;
      default: break;
    }
  }

  edit(id: number) {
    this.router.navigate([`edit/${id}`], { relativeTo: this.route });
  }
  
  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe();
  }

  addProduct() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  filter(productList: Product[]) {
    this.displayService.forSorting(productList);
  }

  sort(productList: Product[]) {
    this.displayService.updateDisplay(productList);
  }

}
