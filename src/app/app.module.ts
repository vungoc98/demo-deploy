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
import { RegisterComponent } from './register/register.component';
import { TaoMoiSanPhamComponent } from './he-thong-san-pham/tao-moi-san-pham/tao-moi-san-pham.component';
import { DanhSachHangHoaComponent } from './he-thong-san-pham/danh-sach-hang-hoa/danh-sach-hang-hoa.component';
import { CapNhatSanPhamComponent } from './he-thong-san-pham/cap-nhat-san-pham/cap-nhat-san-pham.component';
import { DanhSachNhomHangHoaComponent } from './he-thong-san-pham/danh-sach-nhom-hang-hoa/danh-sach-nhom-hang-hoa.component';
import { CapNhatNhomHangHoaComponent } from './he-thong-san-pham/cap-nhat-nhom-hang-hoa/cap-nhat-nhom-hang-hoa.component';
const routesConfig: Routes = [
  { path: '', component: LoginComponent },  
  { path: 'register', component: RegisterComponent },
  
  // 1. nha phan phoi
  { path: 'nhaphanphoi', component: NhaPhanPhoiComponent }, 
  
  // 1.1. He thong san pham
  { path: 'hethongsanpham/taomoisanpham', component: TaoMoiSanPhamComponent },
  { path: 'hethongsanpham/danhsachsanpham', component: DanhSachHangHoaComponent },
  { path: 'hethongsanpham/danhsachsanpham/capnhatsanpham/:id', component: CapNhatSanPhamComponent },
  { path: 'hethongsanpham/hethongnhomsanpham', component: DanhSachNhomHangHoaComponent },
  { path: 'hethongsanpham/hethongnhomsanpham/capnhatnhomsanpham/:name', component: CapNhatNhomHangHoaComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NhaPhanPhoiComponent,
    HeaderNPPComponent,
    NPPComponent,
    RegisterComponent,
    TaoMoiSanPhamComponent,
    DanhSachHangHoaComponent,
    CapNhatSanPhamComponent,
    DanhSachNhomHangHoaComponent,
    CapNhatNhomHangHoaComponent,
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
