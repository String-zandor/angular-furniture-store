import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminProductFormComponent } from './pages/admin-product-form/admin-product-form.component';
import { AdminProductListComponent } from './pages/admin-product-list/admin-product-list.component';
import { AdminComponent } from './pages/admin/admin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AdminUserListComponent } from '../user/pages/admin-user-list/admin-user-list.component';
import { AdminAuthGuard } from 'src/app/core/guards/admin-auth.guard';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { AdminOrdersComponent } from '../order/pages/admin-orders/admin-orders.component';

const routes: Routes = [
  { 
    path: 'admin',
    canActivate: [AdminAuthGuard],
    component: AdminComponent,
    children: [
      { path: 'products/edit/:id', component: AdminProductFormComponent },
      { path: 'products/new', component: AdminProductFormComponent },
      { path: 'products', component: AdminProductListComponent },
      { path: 'users', component: AdminUserListComponent},
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'orders', component: AdminOrdersComponent},
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ]
  },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'home', component: DashboardComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
