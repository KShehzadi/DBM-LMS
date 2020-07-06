import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SignInService } from 'src/app/shared/SignInService/sign-in.service';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
//import { SignInService } from 'src/app/shared/SignInService/sign-in.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //form: FormGroup;
  constructor(private service: SignInService, private router: Router, private toastr: ToastrService) {

  }

  ngOnInit() {
    this.resetForm();
    // this.form = this.fb.group({
    //   file: []
    // })
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }

    this.service.formData = {
      Email: '',
      Password: ''
    }
  }

  onSubmit(form: NgForm) {
    this.service.postLogin(form.value).subscribe(
      (res: any) => {
        SignInService.isLoggedIn = true;
        this.resetForm(form);
        localStorage.setItem('token', res.token);
        localStorage.setItem('Id', res.id);
        this.router.navigateByUrl('');
      },
      err => {
        SignInService.isLoggedIn = false;
        if (err.status == 400) {
          this.toastr.error('Incorrect email or password.', 'Authentication failed.');
        }
        else {
          console.log(err);
        }
      }
    )
  }

}
