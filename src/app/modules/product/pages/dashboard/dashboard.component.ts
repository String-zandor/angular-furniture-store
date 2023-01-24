import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private subject = new BehaviorSubject<Product[]>([]);
  productsDisplay$: Observable<Product[]> = this.subject.asObservable();
  allProducts$?: Observable<Product[]>;
  allProducts: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.allProducts$ = this.productService.getProducts();
    this.productService.getProducts().subscribe(products => {
      this.subject.next(products);
      this.allProducts = products;
    });
  }

  filter(filteredList: Product[]): void {
    this.subject.next(filteredList);
  }

  sort(sortedList: Product[]): void {
    this.subject.next(sortedList);
  }

  search(searchResult: Product[]): void {
    this.subject.next(searchResult);
  }

  onSelection(): void {
    //TODO revise method
  }

}
