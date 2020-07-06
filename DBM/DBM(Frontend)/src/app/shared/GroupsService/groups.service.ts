import { Injectable } from '@angular/core';
import { Groups } from "src/app/shared/GroupsModelClass/groups.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  formData = new Groups();
  readonly rootURL = 'http://localhost:3845/api';
  list: Groups[];
  constructor(private http: HttpClient) { }

  postAddGroupAssignedPermission(formData: Groups) {
    return this.http.post(this.rootURL + '/Permission', formData);
  }

  getPermissions(){
    return this.http.get(this.rootURL + '/Permission')
  }
}
