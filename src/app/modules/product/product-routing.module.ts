import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  // { path: ':term', component: SearchResultComponent },
  { path: '', component: DashboardComponent },
  {
    path: '',
    children : [
      {
        path: 'admin/dashboard',
        component: AdminDashboardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
