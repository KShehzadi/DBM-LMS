import { Component, OnInit } from '@angular/core';
import{TeachersRequestsService} from 'src/app/shared/TeachersRequestsService/teachers-requests.service';
import{StudentsRequestsService} from 'src/app/shared/StudentsRequestsService/students-requests.service';
import { TeacherRequests } from 'src/app/shared/TeachersRequestsModelClass/teacher-requests.model';
import{StudentsRequests} from 'src/app/shared/StudentsRequestsModelClass/students-requests.model';
@Component({
  selector: 'app-sign-up-requests',
  templateUrl: './sign-up-requests.component.html',
  styleUrls: ['./sign-up-requests.component.css']
})
export class SignUpRequestsComponent implements OnInit {
  

  constructor(private service : TeachersRequestsService, private service1 : StudentsRequestsService) { }
  email:string;
  ngOnInit() {

  this.service1.getStudentRequestsList();
  this.service.getTeacherRequestsList();
    
   
  }

  ApproveTeacherRequest(id:string) {
    
    this.service.ApproveRequests(id);
  }

  DisApproveTeacherRequest(id:string)
  {
    this.service.DisapproveRequests(id);
  }

  DisApproveStudentRequest(id:string)
  {
    this.service1.DisapproveRequests(id);
  }
  ApproveStudentsRequest(id:string) {
    //this.service1.formData = I;
    //console.log(this.service.formData);
    //this.email = this.service.formData.Email;
    //console.log(id);
    this.service1.ApproveRequests(id);
  }

}
