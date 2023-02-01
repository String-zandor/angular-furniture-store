
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../../../modules/product/models/product';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
 
  searchInput = new FormControl('', Validators.required);
  result: Product[] | undefined

  constructor(private router: Router) {}

  isControlDisabled() {
    return !this.searchInput.value;
  }

  onSearch(){    
    if(!this.searchInput.value){
      return;
    }
    this.router.navigate([`search/${this.searchInput.value?.trim().toLowerCase()}`]);
  }
}
