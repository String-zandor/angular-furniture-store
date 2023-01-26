
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/modules/product/services/product.service';
import { Product } from '../../../modules/product/models/product';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
 
  
  @Output () products = new EventEmitter<Product[]>()
  @Input () allProducts$?: Observable<Product[]>;
  
  searchInput = new FormControl('');
  result: Product[] | undefined

  constructor(
    private productService: ProductService,
    private router: Router) {}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  searchProduct(){
    // console.log(this.searchInput.value?.toLowerCase() as string)

    // this.productService.getProducts().subscribe((product: Product[])=>{
    //   this.result = product.filter((product:Product) => product.name.toLowerCase().includes(this.searchInput.value?.toLowerCase() as string) ||
    //   product.category.toLowerCase().includes(this.searchInput.value?.toLowerCase() as string) || product.description.desc.toLowerCase().includes(this.searchInput.value?.toLowerCase() as string) )
    //   console.log(this.result)
    //   this.products.emit(this.result)
      
    // })

    this.router.navigate([`search/${this.searchInput}`]);

  }
}
