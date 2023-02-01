import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, filter, map, Observable, of, Subscription, switchMap, tap } from 'rxjs';
import { CartService } from 'src/app/modules/cart/services/cart.service';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit, OnDestroy {

  private subject = new BehaviorSubject<Product[]>([]);
  results$?: Observable<Product[]> = this.subject.asObservable();
  searchTerm: any;
  sub?: Subscription;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute) {
      
  }

  ngOnInit(): void {
    let term = this.route.snapshot.paramMap.get('term');

    this.sub = this.route.params.pipe(
      tap((params) => {
        this.searchTerm = JSON.stringify(params).replaceAll('{"term":"', '').replaceAll('"}', '')
      }),
      switchMap(() => {
        return this.productService.getProducts().pipe(
          map((product: Product[]) => product.filter((product: Product) => product.name.toLowerCase().includes(this.searchTerm) || product.category.toLowerCase().includes(this.searchTerm) ||
            product.description.desc.toLowerCase().includes(this.searchTerm)
          )))
      })
    ).subscribe(products => this.subject.next(products));
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}