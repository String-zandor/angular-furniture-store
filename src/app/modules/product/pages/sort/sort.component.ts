import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Product } from '../../models/product';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnDestroy, OnInit{
  
  @Input() productsToSort$?: Observable<Product[]>;
  @Output() sort = new EventEmitter<Product[]>();
  subscription:Subscription[]=[];
  
  ngOnInit(): void {
    this.sortByDateNewToOld();
  }
  ngOnDestroy(): void {
    for(let sub of this.subscription){
      sub.unsubscribe();
    }
  }
  
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
    console.log('inside sort ascending')
    this.subscription.push(this.productsToSort$!.subscribe((product:Product[]) =>{

      product.sort((a:Product,b:Product) => {
        return ((a[key as keyof Product]  == b[key as keyof Product]) ? 0 : ((a[key as keyof Product]>    b[key as keyof Product]) ? 1 : -1 ));
      })
      this.sort.emit(product)
      console.log(product)
    }))
    
  }

  sortDescending(key: string){
    console.log('inside sort desc')
    this.subscription.push(this.productsToSort$!.subscribe((product:Product[]) =>{
      product.sort((a:Product,b:Product) => {
        return ((a[key as keyof Product]  == b[key as keyof Product]) ? 0 : ((a[key as keyof Product]>    b[key as keyof Product]) ? -1 : 1 ));
      })
      this.sort.emit(product)
      console.log(product)
    }))
  }

  
}
