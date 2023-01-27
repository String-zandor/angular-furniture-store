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
import { AdminProductListComponent } from './pages/admin-product-list/admin-product-list.component';
import { AdminProductComponent } from './components/admin-product/admin-product.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminProductFormComponent } from './pages/admin-product-form/admin-product-form.component'


@NgModule({
  declarations: [
    DashboardComponent,
    ProductItemComponent,
    SortComponent,
    FilterComponent,
    CategoryItemComponent,
    PriceItemComponent,
    SearchResultComponent,
    AdminProductListComponent,
    AdminProductComponent,
    AdminComponent,
    AdminProductFormComponent
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
