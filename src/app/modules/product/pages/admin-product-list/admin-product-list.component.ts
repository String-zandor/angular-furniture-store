import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, switchMap, tap } from 'rxjs';
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
    private productSvc: ProductService,
    private displaySvc: DisplayService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.displaySvc.displayAllProducts().subscribe();
    this.productsDisplay$ = this.displaySvc.productsDisplay$;
    this.allProducts$ = this.productSvc.allProducts$;
    this.productsToSort$ = this.displaySvc.productsToSort$;
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
    this.productSvc.deleteProduct(id).pipe(
      switchMap(() => this.displaySvc.displayAllProducts()),
      tap(products => this.displaySvc.updateDisplay(products))
    ).subscribe();

    this.snackBar.open('Product deleted.', '', { duration: 1000,
    });
  }

  addProduct() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  filter(productList: Product[]) {
    this.displaySvc.forSorting(productList);
  }

  sort(productList: Product[]) {
    this.displaySvc.updateDisplay(productList);
  }

}
