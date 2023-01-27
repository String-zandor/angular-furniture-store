
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
 
  @Input() allProducts$?: Observable<Product>
  allProducts?: string

  searchInput = new FormControl('');
  result: Product[] | undefined

  constructor(private router: Router) {}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');

  }

  onSearch(){
    this.router.navigate([`search/${this.searchInput.value}`]);
  }
}
