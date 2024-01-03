import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductComponent } from './product/product.component';
import { SettingComponent } from './setting/setting.component';
import { FormsModule } from '@angular/forms'; 
import { ChartComponent } from './chart/chart.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideBarComponent,
    MainComponent,
    DashboardComponent,
    ProductComponent,
    SettingComponent,
    ChartComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
     
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
