
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
export class SearchComponent {
 
  @Input() autoComplete: Product[] | undefined
  allProducts?: string

  searchInput = new FormControl('');
  result: Product[] | undefined

  constructor(private router: Router) {}


  onSearch(){    
  //will use to implement auto complete
  //console.log(this.autoComplete)

    this.router.navigate([`search/${this.searchInput.value}`]);
  }
}
