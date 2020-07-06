import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import{TeacherRequests} from 'src/app/shared/TeachersRequestsModelClass/teacher-requests.model';

@Injectable({
  providedIn: 'root'
})
export class TeachersRequestsService {

  formData = new TeacherRequests();
  readonly rootURL = 'http://localhost:3845/api'

  list1: TeacherRequests[];
  constructor(private http:HttpClient) { }

  getTeacherRequestsList() {
    this.http.get(this.rootURL + '/UsersRequests/GetAllTeachersRequests/'+localStorage.getItem('Id'))
    .toPromise()
    .then(res => {
      this.list1= res as TeacherRequests[];
      console.log(res);
    });
  }

  ApproveRequests(value:string) {
    //alert("aa");
    //return this.http.post(this.rootURL + '/UsersRequests/ApproveRequest', formData);
   // console.log(formData);
    return this.http.get(this.rootURL + '/UsersRequests/ApproveTeacher/'+value)
    .toPromise()
    .then(
      res =>
      {
        this.getTeacherRequestsList();
      }
    );
  }

  DisapproveRequests(value:string) {
    //alert("aa");
    //return this.http.post(this.rootURL + '/UsersRequests/ApproveRequest', formData);
   // console.log(formData);
    return this.http.delete(this.rootURL + '/UsersRequests/DeleteTeacher/'+value)
    .toPromise()
    .then(
      res =>
      {
        this.getTeacherRequestsList();
      }
    );
  }
}
