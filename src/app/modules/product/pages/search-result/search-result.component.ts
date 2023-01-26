import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  // @Output() products = new EventEmitter<Product[]>()
  // @Input() allProducts$?: Observable<Product[]>;
  result: Product[] | undefined
  searchTerm: string = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const term = this.route.snapshot.paramMap.get('term');
    this.searchTerm = (term) ? term : '';
    // if no term, redirect to home
  }

  // searchProduct() {
  //   // console.log(this.searchInput.value?.toLowerCase() as string)

  //   this.productService.getProducts().subscribe((product: Product[]) => {
  //     this.result = product.filter((product: Product) => product.name.toLowerCase().includes(this.searchInput.value?.toLowerCase() as string) ||
  //       product.category.toLowerCase().includes(this.searchInput.value?.toLowerCase() as string) || product.description.desc.toLowerCase().includes(this.searchInput.value?.toLowerCase() as string))
  //     console.log(this.result)

  //   })

  // }
}
