import { Injectable } from '@angular/core';
import { SignUp } from "src/app/shared/SignUpModelClass/sign-up.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  formData = new SignUp();
  readonly rootURL = 'http://localhost:3845/api'

  constructor(private http:HttpClient) { }

  postAddUser(formData: SignUp){
    return this.http.post(this.rootURL + '/Users/Register', formData);
  }

  getInstitutes(){
    return this.http.get(this.rootURL + '/Users')
  }
}
