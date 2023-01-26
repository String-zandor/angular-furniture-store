import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { map, Observable, of, Subscription } from 'rxjs';
import { CategoryItemComponent } from '../../components/filter-sub/category-item/category-item.component';
import { PriceItemComponent } from '../../components/filter-sub/price-item/price-item.component';
import { PriceRange, PRICE_RANGES } from '../../models/price-range';
import { Product } from '../../models/product';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {

  // PROPERTIES FOR ALL
  @Input() allProducts$?: Observable<Product[]>;
  @Output() filter = new EventEmitter<Product[]>();
  allProducts: Product[] = [];
  subscriptions: Subscription[] = [];

  // PROPERTIES FOR CATEGORY
  categories$: Observable<Set<string>> = of(new Set<string>());
  activeCateg: string[] = [];
  @ViewChildren(CategoryItemComponent)
  categoryItems?: QueryList<CategoryItemComponent>;

  // PROPERTIES FOR PRICE RANGE
  PR: PriceRange[] = PRICE_RANGES;
  activePR: PriceRange[] = [];
  @ViewChildren(PriceItemComponent)
  priceItems?: QueryList<PriceItemComponent>;

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
      ).pipe(
        map(category => new Set(category))
      );
    }
  }

  onChanges(data: { category?: string, range?: PriceRange, show: boolean }): void {
    let filteredList: Product[] = this.allProducts;
    if (data.category) {
      this.onCategChanges(data.category, data.show);
    }

    if (this.activeCateg.length > 0) {
      filteredList = this.filterByCategory(filteredList);
    }

    if (data.range) {
      this.onPriceChanges(data.range, data.show);
    }

    if (this.activePR.length > 0) {
      filteredList = this.filterByPrice(filteredList);
    }

    console.log('Inside OnChanges', filteredList);
    this.filter.emit(filteredList);
  }

  /**
   * METHODS FOR CATEGORY FILTER
   */
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

  /**
   * METHODS FOR PRICE FILTER
   */
  onPriceChanges(range: PriceRange, show: boolean): void {
    if (show) {
      this.activePR.push(range);
    } else {
      this.activePR = this.activePR.filter(pr => pr.min !== range.min);
    }

    //test only
    console.log('filteredByPrice', this.filterByPrice(this.allProducts));
  }

  filterByPrice(products: Product[]): Product[] {
    let filtered: Product[] = [];
    for (const pr of this.activePR) {
      let list = products.filter(product => {
        let result: boolean;
        if (pr.max) {
          result = (product.price >= pr.min && product.price <= pr.max);
        } else {
          result = (product.price >= pr.min);
        }
        return result;
      });

      // add list filtered by specific price range to the overall filteredlist
      filtered = filtered.concat(list);
    }
    return filtered;
  }

  /**
   * Implement method that will reset the form
   */
  clearAll(): void {
    this.categoryItems?.forEach(child => child.reset());
    this.priceItems?.forEach(child => child.reset());
  }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

}
