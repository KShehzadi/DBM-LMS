import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/shared/CoursesService/courses.service';

@Component({
  selector: 'app-enrollment-requests',
  templateUrl: './enrollment-requests.component.html',
  styleUrls: ['./enrollment-requests.component.css']
})
export class EnrollmentRequestsComponent implements OnInit {

  constructor(private service: CoursesService) { }

  ngOnInit() {
    this.service.getEnrollmentRequests();
    //console.log(this.service.EnrollmentList);
  }

  ApproveRequest(id:string) {
    console.log(id);
    this.service.ApproveRequests(id);
  }

  DisApproveRequest(id:string)
  {
    this.service.DisApproveRequests(id);
  }

}
