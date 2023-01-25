import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { SortComponent } from './pages/sort/sort.component';
import { FilterComponent } from './pages/filter/filter.component';
import { SearchComponent } from './pages/search/search.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoryItemComponent } from './components/filter-sub/category-item/category-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PriceItemComponent } from './components/filter-sub/price-item/price-item.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProductItemComponent,
    SortComponent,
    FilterComponent,
    SearchComponent,
    CategoryItemComponent,
    PriceItemComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule, 
    ReactiveFormsModule
  ],
  exports:[
    SearchComponent

  ]
})
export class ProductModule { }
