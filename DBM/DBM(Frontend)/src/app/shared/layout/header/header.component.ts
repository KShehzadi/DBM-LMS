import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignInService } from '../../SignInService/sign-in.service';
import { CoursesService } from '../../CoursesService/courses.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userDetails;
  f = false;
  

  // LoggedIn: boolean;

  constructor(private router: Router, private service: SignInService) { }

  ngOnInit() {
    // var tempi;
    this.service.getUserProfile().subscribe(
      (res: any) => {
        this.userDetails = res;
        // localStorage.setItem('Id', res.tempId);
        // tempi = res.tempId;
        console.log(this.userDetails);
      },
      err => {
        console.log(err);
      }
    );

    // alert(tempi);


    if (localStorage.getItem('token')) {
      var i = localStorage.getItem('Id');
      
      this.service.getUserRole(i);
      // console.log(this.service.lstTemp[0]['Designation']);
      // console.log(this.service.lstTemp);
      // this.service.designation = this.service.lstTemp[0]['designation'];
    }

    console.log(this.service.designation);
    
    // this.router.navigate(['']);
    




  }

  loggedIn() {
    return !!localStorage.getItem('token')
  }

  roles() {
    return this.service.getUserRole('4');
  }

  onLogout() {
    // this.LoggedIn = SignInService.isLoggedIn;
    this.userDetails = null;
    localStorage.removeItem('token');
    localStorage.removeItem('Id');
    this.service.designation = null;
    this.router.navigateByUrl('/');
  }

}
