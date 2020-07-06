import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

import { FormGroup, Validators, FormBuilder, AbstractControl, ValidatorFn } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { GroupsService } from "src/app/shared/GroupsService/groups.service";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SignInService } from 'src/app/shared/SignInService/sign-in.service';

export interface Permission{
  id: number;
  name: string;
}
@Component({
  selector: 'app-add-groups',
  templateUrl: './add-groups.component.html',
  styleUrls: ['./add-groups.component.css']
})
export class AddGroupsComponent implements OnInit {
  form: FormGroup;
  permissions = new FormControl();
  // = [''];

  selectedValue: string;
  lst = [''];
  successfulSave: boolean;
  errors: string[];
  names:string;
  //permissionList: string[] = ['Abc', 'Xyz', 'Klm', 'per1'];
  constructor(private service:GroupsService, private httpService: HttpClient, private Service2: SignInService) { }
  permissionList: Permission[];
  userDetails;
  selected = null;
  ngOnInit() {
    this.resetForm();
    this.Service2.getUserProfile().subscribe(
      res => {
        //console.log(res);
        this.userDetails = res;
        //alert("res");
      },
      err => {
        console.log(err);
        //alert("err");
      }
    );

 

    



    this.service.getPermissions().subscribe(
      data => {
        this.permissionList = data as Permission[];
        //alert(this.permissionList[0]["id"]);
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
    for (let prop in this.permissionList) {
      console.log(prop);
    }
    this.errors = [];
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.service.formData = {
      id: 0,
      group:'',
      Name:'',
      email:''
    }


    
  
  
  }
 
  changeClient(value) {
    console.log(value);
   // this.lst = value;
   // console.log(this.lst);
    this.names = '';
    for (let index = 0; index < value.length; index++) 
    {
      this.names = this.names+' '+value[index];
    }
    console.log(this.names);
  }
  onSubmit(form: NgForm) {

   // console.log(this.form.value.name);
    //alert(this.userDetails.email);
   
    // console.log(form.value);
    if (this.service.formData.id == 0) {
      
      this.insertRecord(form);
    
    }
    else {
      //this.updateRecord(form);
    }


  }

  insertRecord(form: NgForm) {
    form.value.Email = this.userDetails.email;
   
    form.value.Name = this.names;
    
    this.service.postAddGroupAssignedPermission(form.value).subscribe(
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
