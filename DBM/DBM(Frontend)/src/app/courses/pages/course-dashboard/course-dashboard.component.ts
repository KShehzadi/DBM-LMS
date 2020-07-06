import { Component, OnInit, VERSION } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { HostBinding } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CoursesService } from 'src/app/shared/CoursesService/courses.service';


export interface ExampleTab {
  label: string;
  content: string;
}

@Component({
  selector: 'app-course-dashboard',
  templateUrl: './course-dashboard.component.html',
  styleUrls: ['./course-dashboard.component.css']
})
export class CourseDashboardComponent implements OnInit {

  MyName:string;
  ngVersion: string = VERSION.full;
  matVersion: string = '5.1.0';
  breakpoint: number;

  asyncTabs: Observable<ExampleTab[]>;

  constructor( private router:Router , private service:CoursesService) {
    this.asyncTabs = new Observable((observer: Observer<ExampleTab[]>) => {
      setTimeout(() => {
        observer.next([
          { label: 'First', content: 'Content 1' },
          { label: 'Second', content: 'Content 2' },
          { label: 'Third', content: 'Content 3' },
        ]);
      }, 1000);
    });
  }

  ngOnInit() {
    this.MyName = this.service.getCourseName();
    this.breakpoint = (window.innerWidth <= 800) ? 1 : 1;
    // this.breakpoint = (window.innerWidth <= 500) ? 1 : 4;
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 800) ? 1 : 1;
    // this.breakpoint = (event.target.innerWidth <= 500) ? 1 : 4;
  }

  ViewRequests()
  {
    this.router.navigate(['/EnrollmentRequests']);
  }

}
