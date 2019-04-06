import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module'; 
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http'; 
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
const routesConfig: Routes = [
  { path: '', component: LoginComponent }
]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
   // AppRoutingModule
    RouterModule.forRoot(routesConfig,{onSameUrlNavigation: 'reload'}),
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
