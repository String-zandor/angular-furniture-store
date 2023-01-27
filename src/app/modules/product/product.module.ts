import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { SortComponent } from './pages/sort/sort.component';
import { FilterComponent } from './pages/filter/filter.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoryItemComponent } from './components/filter-sub/category-item/category-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PriceItemComponent } from './components/filter-sub/price-item/price-item.component';

import {MatListModule} from '@angular/material/list';
import { SearchResultComponent } from './pages/search-result/search-result.component';
import { AdminProductItemComponent } from './components/admin-product-item/admin-product-item.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProductItemComponent,
    SortComponent,
    FilterComponent,
    CategoryItemComponent,
    PriceItemComponent,
    SearchResultComponent,
    AdminDashboardComponent,
    AdminProductItemComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule, 
    ReactiveFormsModule,
    MatListModule
  ],
  exports:[]
})
export class ProductModule { }
