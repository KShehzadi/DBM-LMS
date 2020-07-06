import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SignInService } from 'src/app/shared/SignInService/sign-in.service';

import { FormGroup, Validators, FormBuilder, AbstractControl, ValidatorFn } from '@angular/forms';
import { NgForm } from '@angular/forms';

import{AssignGroupService} from 'src/app/shared/AssignGroupService/assign-group.service';
export interface Groups{
  id: number;
  name: string;
}
export interface Users{
  id: number;
  name: string;
}
@Component({
  selector: 'app-assign-groups',
  templateUrl: './assign-groups.component.html',
  styleUrls: ['./assign-groups.component.css']
})
export class AssignGroupsComponent implements OnInit {
  form: FormGroup;
  constructor(private service:AssignGroupService, private httpService: HttpClient, private Service2: SignInService) { }
  userList: Users[];
  groupList:Groups[];
  userDetails;
  users:string;
  group:string;
  ngOnInit() {
    //this.resetForm();
    this.Service2.getUserProfile().subscribe(
      res => {
        this.userDetails = res;
        this.service.GetGroups(this.userDetails.email).subscribe(

          data => {
            this.groupList = data as Groups[];
            //alert(this.permissionList[0]["id"]);
          },
          (err: HttpErrorResponse) => {
            console.log(err.message);
          }
        );
         this.service.GetUsers(this.userDetails.email).subscribe(
         data => {
          this.userList = data as Users[];
        //alert(this.permissionList[0]["id"]);
          },
          (err: HttpErrorResponse) => {
          console.log(err.message);
          }
          );

      //   console.log(this.userDetails.email);
      //  this.email = this.userDetails.email;
        // console.log(this.email);
        // alert(this.email);
        //alert(this.userDetails.email);
      },
      err => {
        console.log(err);
        //alert("err");
      }
    );
   // alert(this.userDetails.email);
  
     
    
    

  }
  changeClient(value) {
    //console.log(value);
    this.users = '';
    for (let index = 0; index < value.length; index++) 
    {
      this.users = this.users+' '+value[index];
    }
    console.log(this.users);
  }

  onSubmit(form: NgForm) {

       this.insertRecord(form);
 
   }
   resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.service.formData = {
      id: 0,
      group:'',
      users:''
    }
  
  }
 
   insertRecord(form: NgForm) {
     
     form.value.users = this.users;
     this.service.postAssignGroups(form.value).subscribe(
       res => {
         this.resetForm(form);
       },
       err => {
         //alert(err);
         console.log(err);
       }
     )
   }
 
}



 


