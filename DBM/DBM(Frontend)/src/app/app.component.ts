import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignInService } from './shared/SignInService/sign-in.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DMS';

  LoggedIn: boolean;

  constructor(private router: Router) {
    this.LoggedIn = SignInService.isLoggedIn;
   }

  
}
