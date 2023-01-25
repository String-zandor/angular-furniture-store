
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  
  @Output () products = new EventEmitter<Product[]>()
  @Input () allProducts$?: Observable<Product[]>;
  
  searchInput = new FormControl('');
  result: Product[] | undefined

  searchProduct(){
    // console.log(this.searchInput.value?.toLowerCase() as string)

    this.allProducts$?.subscribe((product: Product[])=>{
      this.result = product.filter((product:Product) => product.name.toLowerCase().includes(this.searchInput.value?.toLowerCase() as string) ||
      product.category.toLowerCase().includes(this.searchInput.value?.toLowerCase() as string) || product.description.desc.toLowerCase().includes(this.searchInput.value?.toLowerCase() as string) )
      console.log(this.result)
      this.products.emit(this.result)
    })
  }
}
