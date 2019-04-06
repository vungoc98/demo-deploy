import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formSignIn: FormGroup;
  thongTinTaiKhoan: any;
  results: any;
  nha_phan_phoi;
  data;
  login = true;
  info: Login;
  @Output() onLogin: EventEmitter<any>;
  constructor( private fb: FormBuilder, private http: Http, private router: Router) {  
  }

  ngOnInit() {
  	this.formSignIn = this.fb.group({
  		name: '',
  		password: ''
  	})
  }

  async onSubmit() { 
    // tao duong dan can post len
    const url = "https://ngoc-demo-deploy-app.herokuapp.com/login";

    // tao header
    const headers = new Headers({ 'Content-Type': 'application/json' });

    // lay body gui len
    const body = JSON.stringify(this.formSignIn.value);

    // res la ket qua tra ve tu server
    await this.http.post(url, body, {headers: headers})
    .toPromise()
    .then(res => res.text())
    .then(resJson => {
      console.log(resJson);
    }); 
  }
  hienthi() {
     //console.log(this.loginService.getThongTinTaiKhoan());
  }

}
class Login { 
  public check;
  public username;
  public password;
  public name;
  public address;
  public email;
  public mobile;
  public acount_type;
  constructor(check, username, password, name, address, email, mobile, acount_type) { 
    this.check = check;
    this.username = username;
    this.password = password;
    this.name = name;
    this.address = address;
    this.email = email;
    this.mobile = mobile;
    this.acount_type = acount_type;
  }
}