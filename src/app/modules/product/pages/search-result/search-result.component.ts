import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, Observable, of } from 'rxjs';
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
  searchTerm: any;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router) { }



  ngOnInit(): void {
    let term = this.route.snapshot.paramMap.get('term');

    this.route.params.subscribe((params) => {
      this.searchTerm = JSON.stringify(params).replaceAll('{"term":"','').replaceAll('"}','')
      console.log(this.searchTerm)
      this.results$ = this.productService.getProducts().pipe(
        map((product: Product[]) => product.filter((product: Product) => product.name.toLowerCase().includes(this.searchTerm) || product.category.toLowerCase().includes(this.searchTerm) ||
          product.description.desc.toLowerCase().includes(this.searchTerm)
        )))
    });
  }
}