import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { map, Observable, of, Subscription } from 'rxjs';
import { CategoryItemComponent } from '../../components/filter-sub/category-item/category-item.component';
import { PriceItemComponent } from '../../components/filter-sub/price-item/price-item.component';
import { RoomItemComponent } from '../../components/filter-sub/room-item/room-item.component';
import { PriceRange, PRICE_RANGES } from '../../models/price-range';
import { Product } from '../../models/product';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {

  // PROPERTIES FOR ALL
  @Input() products$?: Observable<Product[]>;
  @Output() filter = new EventEmitter<Product[]>();
  products: Product[] = [];
  subscriptions: Subscription[] = [];

  // PROPERTIES FOR ROOM
  rooms$: Observable<Set<string>> = of(new Set<string>());
  activeRoom: string[] = [];
  @ViewChildren(RoomItemComponent)
  roomItems?: QueryList<CategoryItemComponent>;

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
    this.getRooms();
    if (this.products$) {
      const sub = this.products$?.subscribe(list => this.products = list);
      this.subscriptions.push(sub);
    }
  }

  getRooms() {
    if (this.products$) {
      this.rooms$ = this.products$.pipe(
        map(products => products.map(product => product.room)),
        map(rooms => new Set(rooms))
      );
    }
  }

  getCategories() {
    if (this.products$) {
      this.categories$ = this.products$.pipe(
        map(products => products.map(product => product.category)),
        map(categories => new Set(categories))
      );
    }
  }

  onChanges(data: { room?: string, category?: string, range?: PriceRange, show: boolean }): void {
    let filteredList: Product[] = this.products;
    if (data.room) {
      this.onRoomChanges(data.room, data.show);
    }

    if (this.activeRoom.length > 0) {
      filteredList = this.filterByRoom(filteredList);
    }
    
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

    this.filter.emit(filteredList);
  }

  onRoomChanges(room: string, show: boolean) {
    if (show) {
      this.activeRoom.push(room);
    } else {
      this.activeRoom = this.activeRoom.filter(r => r !== room);
    }
  }

  filterByRoom(products: Product[]): Product[] {
    let filtered: Product[] = [];
    for (const room of this.activeRoom) {
      let list = products.filter(product => product.room === room);
      filtered = filtered.concat(list);
    }
    return filtered;
  }

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

  onPriceChanges(range: PriceRange, show: boolean): void {
    if (show) {
      this.activePR.push(range);
    } else {
      this.activePR = this.activePR.filter(pr => pr.min !== range.min);
    }

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
