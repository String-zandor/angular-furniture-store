import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent{
  @Input() productsToSort$?: Observable<Product[]>;
  @Output() sort = new EventEmitter<Product[]>();

  sortByNameAscending(){
    this.sortAscending('name')
  }
  sortByNameDescending(){
    this.sortDescending('name')
  }
  sortByPriceLowest(){
    this.sortAscending('price')
  }
  sortByPriceHighest(){
    this.sortDescending('price')
  }
  sortByDateOldToNew(){
    this.sortAscending('postingDate')
  }
  sortByDateNewToOld(){
    this.sortDescending('postingDate')
  }
  sortAscending(key : string){
    this.productsToSort$!.subscribe((product:Product[]) =>{
      product.sort((a:Product,b:Product) => {
        return ((a[key as keyof Product]  == b[key as keyof Product]) ? 0 : ((a[key as keyof Product]>    b[key as keyof Product]) ? 1 : -1 ));
      })
      this.sort.emit(product)
    })
  }

  sortDescending(key: string){
    this.productsToSort$!.subscribe((product:Product[]) =>{
      product.sort((a:Product,b:Product) => {
        return ((a[key as keyof Product]  == b[key as keyof Product]) ? 0 : ((a[key as keyof Product]>    b[key as keyof Product]) ? -1 : 1 ));
      })
      this.sort.emit(product)
    })
  }

  
}
