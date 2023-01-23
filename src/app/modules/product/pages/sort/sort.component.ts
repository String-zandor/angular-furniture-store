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
// can be refactored,
  sortByName(){
    this.allProducts$!.subscribe((product:Product[]) =>{
      product.sort((a:Product,b:Product) => {
        return ((a['name']  == b['name']) ? 0 : ((a['name']>    b['name']) ? 1 : -1 ));
      })
      this.sort.emit(product)
    })
  }
  sortByPriceLowest(){
    this.allProducts$!.subscribe((product:Product[]) =>{
      product.sort((a:Product,b:Product) => {
        return ((a['price']  == b['price']) ? 0 : ((a['price']>    b['price']) ? 1 : -1 ));
      })
      this.sort.emit(product)
    })
  }
  sortByPriceHighest(){
    this.allProducts$!.subscribe((product:Product[]) =>{
      product.sort((a:Product,b:Product) => {
        return ((a['price']  == b['price']) ? 0 : ((a['price']>    b['price']) ? -1 : 1 ));
      })
      this.sort.emit(product)
    })
  }
  sortByDateOldToNew(){
    this.allProducts$!.subscribe((product:Product[]) =>{
      product.sort((a:Product,b:Product) => {
        return ((a['postingDate']  == b['postingDate']) ? 0 : ((a['postingDate']>    b['postingDate']) ? 1 : -1 ));
      })
      this.sort.emit(product)
    })
  }
  sortByDateNewToOld(){
    this.allProducts$!.subscribe((product:Product[]) =>{
      product.sort((a:Product,b:Product) => {
        return ((a['postingDate']  == b['postingDate']) ? 0 : ((a['postingDate']>    b['postingDate']) ? -1 : 1 ));
      })
      this.sort.emit(product)
    })
  }

  // executeAction(sortedList:Product[]){
  //   this.sort.emit(sortedList)
  // }
}
