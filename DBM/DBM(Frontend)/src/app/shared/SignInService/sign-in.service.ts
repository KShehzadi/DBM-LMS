import { Injectable } from '@angular/core';
//import { SignIn } from "src/app/shared/SignInModelClass/sign-in.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { SignIn } from '../SignInModelClass/sign-in.model';
import { element } from 'protractor';
import { SignUp } from '../SignUpModelClass/sign-up.model';
//import { httpClient } from "@angular/common/http";
//import { HttpClient } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  formData: SignIn;
  readonly rootURL = 'http://localhost:3845/api';
  public static isLoggedIn = false;
  lstTemp: SignUp[];
  designation: string;
  

  constructor(private http: HttpClient) { }

  loggedIn() {
    return !!localStorage.getItem('token')
  }

  postLogin(formData: SignIn) {
    return this.http.post(this.rootURL + '/Users/Login', formData);
  }

  getUserProfile() {

    return this.http.get(this.rootURL + '/UserProfile/GetUserProfile');
  }

  getUserRole(id: string) {
    
    this.http.get(this.rootURL + '/UserProfile/RoleDetails/' + id).toPromise().then(
      (res:any) => {
        this.lstTemp = res as SignUp[];
        //console.log(this.lstTemp[0]['designation']);
        this.designation = this.lstTemp[0]['designation'];
        // alert("stop");
      }
    );
  }

  checkAdmin() {
    if (this.designation == 'Admin') {
      return true;
    }
    else {
      return false;
    }
  }

  checkTeacher() {
    if (this.designation == 'Teacher') {
      return true;
    }
    else {
      return false;
    }
  }

  checkStudent() {
    if (this.designation == 'Student') {
      return true;
    }
    else {
      return false;
    }
  }

  roleMatch(allowedRoles): boolean {
    var isMatch = false;
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var userRole = payLoad.role;
    allowedRoles.forEach(element => {
      if (userRole == element) {
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }
}
