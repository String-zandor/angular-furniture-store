import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';

// --COMPONENTS

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { SortComponent } from './pages/sort/sort.component';
import { FilterComponent } from './pages/filter/filter.component';

import { CategoryItemComponent } from './components/filter-sub/category-item/category-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PriceItemComponent } from './components/filter-sub/price-item/price-item.component';

// ADDITIONAL MODULE
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';

//
import { SearchResultComponent } from './pages/search-result/search-result.component'
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    DashboardComponent,
    ProductItemComponent,
    SortComponent,
    FilterComponent,
    CategoryItemComponent,
    PriceItemComponent,
    SearchResultComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule, 
    ReactiveFormsModule,
    MatListModule, MatGridListModule
  ],
  exports:[]
})
export class ProductModule { }
