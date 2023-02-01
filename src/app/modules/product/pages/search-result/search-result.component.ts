import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, filter, map, Observable, of, switchMap, tap } from 'rxjs';
import { CartService } from 'src/app/modules/cart/services/cart.service';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  private subject = new BehaviorSubject<Product[]>([]);
  results$?: Observable<Product[]> = this.subject.asObservable();
  searchTerm: any;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute) {
      
    }



  ngOnInit(): void {
    let term = this.route.snapshot.paramMap.get('term');

    this.route.params.pipe(
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
}