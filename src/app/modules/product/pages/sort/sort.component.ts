import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {
  @Input() allProducts$?: Observable<Product[]>;
  @Output() sort = new EventEmitter<Product[]>();

  sortedList: Product[] = [];
  
  ngOnInit():void {
    console.log(this.sortedList)
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
    this.allProducts$!.subscribe((product:Product[]) =>{
      product.sort((a:Product,b:Product) => {
        return ((a[key as keyof Product]  == b[key as keyof Product]) ? 0 : ((a[key as keyof Product]>    b[key as keyof Product]) ? 1 : -1 ));
      })
      this.sortedList = product
      this.sort.emit(this.sortedList)
    })
  }

  sortDescending(key: string){
    this.allProducts$!.subscribe((product:Product[]) =>{
      product.sort((a:Product,b:Product) => {
        return ((a[key as keyof Product]  == b[key as keyof Product]) ? 0 : ((a[key as keyof Product]>    b[key as keyof Product]) ? -1 : 1 ));
      })
      this.sortedList = product
      this.sort.emit(this.sortedList)
    })
  }

  

  // executeAction(sortedList:Product[]){
  //   this.sort.emit(sortedList)
  // }
}
