import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductRoutingModule } from './product-routing.module';

import { ProductItemComponent } from './components/product-item/product-item.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FilterComponent } from './pages/filter/filter.component';
import { SortComponent } from './pages/sort/sort.component';

import { ReactiveFormsModule } from '@angular/forms';
import { CategoryItemComponent } from './components/filter-sub/category-item/category-item.component';
import { PriceItemComponent } from './components/filter-sub/price-item/price-item.component';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';


import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatRadioModule } from '@angular/material/radio';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { AdminUserListComponent } from '../user/pages/admin-user-list/admin-user-list.component';
import { AdminProductItemComponent } from './components/admin-product-item/admin-product-item.component';
import { AdminProductComponent } from './components/admin-product/admin-product.component';
import { RoomItemComponent } from './components/filter-sub/room-item/room-item.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AdminProductFormComponent } from './pages/admin-product-form/admin-product-form.component';
import { AdminProductListComponent } from './pages/admin-product-list/admin-product-list.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { SearchResultComponent } from './pages/search-result/search-result.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';


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
    SharedModule,
    ProductRoutingModule, 
    ReactiveFormsModule,
    MatListModule, 
    MatGridListModule,
    MatMenuModule, 
    MatCheckboxModule, 
    MatRadioModule, 
    MatAutocompleteModule,
    MatTableModule, 
    MatDialogModule, MatExpansionModule, MatButtonModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports:[]
})
export class ProductModule { }
