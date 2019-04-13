import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module'; 
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http'; 
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NhaPhanPhoiComponent } from './nha-phan-phoi/nha-phan-phoi.component';
import { HeaderNPPComponent } from './header-npp.component';
import { NPPComponent } from './npp.component';
// service
import { AcountInfoService } from './acount-info.service';
const routesConfig: Routes = [
  { path: '', component: LoginComponent }, 

  // nha phan phoi
  { path: 'nhaphanphoi', component: NhaPhanPhoiComponent }, 
]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NhaPhanPhoiComponent,
    HeaderNPPComponent,
    NPPComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
   // AppRoutingModule
    RouterModule.forRoot(routesConfig,{onSameUrlNavigation: 'reload'}),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [AcountInfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
