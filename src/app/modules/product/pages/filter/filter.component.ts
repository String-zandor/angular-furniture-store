import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { map, Observable, of, Subscription } from 'rxjs';
import { Product } from '../../models/product';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {

  @Input() allProducts$?: Observable<Product[]>;
  @Output() filter = new EventEmitter<Product[]>();

  categories$: Observable<string[]> = of([]);
  allProducts: Product[] = [];

  filteredList: Product[] = [];
  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.getCategories();
    if (this.allProducts$) {
      const sub = this.allProducts$?.subscribe(list => this.allProducts = list);
      this.subscriptions.push(sub);
    }
  }

  getCategories() {
    if (this.allProducts$) {
      this.categories$ = this.allProducts$.pipe(
        map(products => products.map(product => product.category))
      );
    }
  }

  onChanges(data: { category: string, show: boolean }): void {
    if (data.show) {
      this.addToList(data.category);
    } else {
      this.removeFromList(data.category);
    }
    this.filter.emit(this.filteredList);
  }

  addToList(category: string): void {
    const product = this.allProducts.find(product => product.category === category);
    if (product) {
      this.filteredList.push(product);
    }
  }

  removeFromList(category: string): void {
    this.filteredList = this.filteredList.filter(product => product.category !== category);
  }

  ngOnDestroy(): void {
    //TODO
  }

}
