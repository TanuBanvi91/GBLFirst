import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingComponent } from './setting/setting.component';
import { ProductComponent } from './product/product.component';
import { ChartComponent } from './chart/chart.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'setting', component: SettingComponent },
  {path: 'product', component: ProductComponent},
  {path: 'chart', component:ChartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
