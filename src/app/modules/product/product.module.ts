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
import {MatMenuModule} from '@angular/material/menu';



import {MatCheckboxModule} from '@angular/material/checkbox';

import {MatRadioModule} from '@angular/material/radio';

import { SearchResultComponent } from './pages/search-result/search-result.component';
import { AdminProductItemComponent } from './components/admin-product-item/admin-product-item.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AdminProductListComponent } from './pages/admin-product-list/admin-product-list.component';
import { AdminProductComponent } from './components/admin-product/admin-product.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminProductFormComponent } from './pages/admin-product-form/admin-product-form.component'
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminUserListComponent } from '../user/pages/admin-user-list/admin-user-list.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { RoomItemComponent } from './components/filter-sub/room-item/room-item.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';


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
    AdminProductListComponent,
    AdminProductComponent,
    AdminComponent,
    AdminProductFormComponent,
    AdminUserListComponent,
    ProductDetailComponent,
    ProductListComponent,
    RoomItemComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule, 
    ReactiveFormsModule,
    MatListModule, MatGridListModule,MatMenuModule, MatCheckboxModule, MatRadioModule, MatAutocompleteModule,
    MatTableModule, MatDialogModule
    
  ],
  exports:[]
})
export class ProductModule { }
