import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { DisplayService } from './display.service';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  /***
   * 
   * TODO: for implementation
   * 
   */
  activeCateg: string[] = [];

  constructor(private display: DisplayService) { }

  onCategChanges(category: string, show: boolean) {
    if (show) {
      this.activeCateg.push(category);
    } else {
      this.activeCateg = this.activeCateg.filter(categ => categ !== category);
    }
  }

  filterByCategory(products: Product[]): Product[] {
    let filtered: Product[] = [];
    for (const categ of this.activeCateg) {
      let list = products.filter(product => product.category === categ);
      filtered = filtered.concat(list);
    }
    return filtered;
  }

}
