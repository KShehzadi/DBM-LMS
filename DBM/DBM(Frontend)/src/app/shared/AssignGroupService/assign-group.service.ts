import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import{AssignGroup} from 'src/app/shared/AssignGroupModel/assign-group.model';
@Injectable({
  providedIn: 'root'
})
export class AssignGroupService {

  formData = new AssignGroup();
  readonly rootURL = 'http://localhost:3845/api';
  //list: Groups[];
  constructor(private http: HttpClient) { }

  GetUsers(email:string){
    return this.http.get(this.rootURL + '/Permission/GetUsers/'+email);
  }

  postAssignGroups(formData: AssignGroup){
    return this.http.post(this.rootURL + '/Permission/AssignGroups',formData);
  }

  GetGroups(email:string){
    return this.http.get(this.rootURL + '/Permission/GetGroups/'+email);
  }
}
