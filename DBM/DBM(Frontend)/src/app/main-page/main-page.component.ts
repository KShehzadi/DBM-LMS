import { Component, OnInit ,VERSION } from '@angular/core';
import { SignInService } from '../shared/SignInService/sign-in.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  // LoggedIn: boolean;

  constructor() {
    // this.LoggedIn = SignInService.isLoggedIn;
    // alert(this.LoggedIn);
   }

  ngVersion: string = VERSION.full;
  matVersion: string = '5.1.0';
  breakpoint: number;
  ngOnInit() {
    
    if (window.innerWidth <= 500)
     {
       this.breakpoint = 1;
     }
   
     else  if (window.innerWidth <= 800)
     {
       this.breakpoint = 2;
     }
     else
     {
       this.breakpoint = 4;
     }
    // this.breakpoint = (window.innerWidth <= 800 ) ? 2 :
    // (window.innerWidth <= 600) ? 1: 4;
    // this.breakpoint = (window.innerWidth <= 500) ? 1 : 4;
  }
  
   onResize(event) {
    if (event.target.innerWidth <= 550)
    {
      this.breakpoint = 1;
    }
    
     else
     {
      if (event.target.innerWidth <= 800)
      {
        this.breakpoint = 2;
      }
      else if (event.target.innerWidth <= 1100)
      {
        this.breakpoint = 3;
      }
       else
       {
        this.breakpoint = 4;
       }
       
     }
  //  this.breakpoint = (event.target.innerWidth <= 800) ? 2 :
  //  this.breakpoint =(event.target.innerWidth <= 600) ? 1:4;
  //   // this.breakpoint = (event.target.innerWidth <= 500) ? 1 : 4;
  }
}
