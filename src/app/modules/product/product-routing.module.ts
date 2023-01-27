import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminProductFormComponent } from './pages/admin-product-form/admin-product-form.component';
import { AdminProductListComponent } from './pages/admin-product-list/admin-product-list.component';
import { AdminComponent } from './pages/admin/admin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  { 
    path: 'admin', 
    component: AdminComponent,
    children: [
      // { path: 'home', component: },
      { path: 'products/edit/:id', component: AdminProductFormComponent },
      { path: 'products/new', component: AdminProductFormComponent },
      { path: 'products', component: AdminProductListComponent },
      // { path: 'users', component: }
    ]
  },
  { path: 'home', component: DashboardComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
