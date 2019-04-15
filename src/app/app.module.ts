import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module'; 
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'; 
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
import { TaoMoiKhoHangComponent } from './he-thong-kho-hang/tao-moi-kho-hang/tao-moi-kho-hang.component';
import { DanhSachKhoHangComponent } from './he-thong-kho-hang/danh-sach-kho-hang/danh-sach-kho-hang.component';
import { ChiTietKhoHangComponent } from './he-thong-kho-hang/chi-tiet-kho-hang/chi-tiet-kho-hang.component';
import { ThongKeComponent } from './he-thong-kho-hang/thong-ke/thong-ke.component';
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

   // 1.2. He thong kho hang
  { path: 'hethongkhohang/taomoikhohang', component: TaoMoiKhoHangComponent },
  { path: 'hethongkhohang/danhsachkhohang', component: DanhSachKhoHangComponent },
  { path: 'hethongkhohang/danhsachkhohang/chitietkhohang/:id', component: ChiTietKhoHangComponent },  
  { path: 'hethongkhohang/thongke', component: ThongKeComponent },
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
    TaoMoiKhoHangComponent,
    DanhSachKhoHangComponent,
    ChiTietKhoHangComponent, 
    ThongKeComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
   // AppRoutingModule
    RouterModule.forRoot(routesConfig,{onSameUrlNavigation: 'reload'}),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot()
  ],
  providers: [AcountInfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
