import { Component, OnInit } from '@angular/core';
import { AddInstituteServiceService } from "src/app/shared/InstituteService/add-institute-service.service";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgForm, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-institutes',
  templateUrl: './add-institutes.component.html',
  styleUrls: ['./add-institutes.component.css']
})
export class AddInstitutesComponent implements OnInit {

  InstituteNameError = '';


  constructor(private service: AddInstituteServiceService, private httpService: HttpClient) {

  }


  ngOnInit() {
    // if (this.service.formData == null){
    //   this.resetForm();
    // }
   //alert(this.service.editFlag);
    if (this.service.editFlag == false)
    {
      this.resetForm();
    }
    //console.log(this.service.formData);
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.service.formData = {
      id: 0,
      instituteName: '',
    }
  }

  onSubmit(form: NgForm) {
    //console.log(this.service.formData);
    console.log(this.service.formData.id);
    if (this.service.formData.id == 0) {
      this.insertRecord(form);
    }
    else {
      this.service.editFlag = false;
      this.updateRecord(form);
    }
  }


  insertRecord(form: NgForm) {
    this.service.postAddInstitute().subscribe(
      res => {
        this.resetForm(form);
      },
      err => {
        console.log(err);
        alert(err.error["UniqueInstituteName"]);
        this.InstituteNameError = err.error["UniqueInstituteName"];
      }
    );
  }

  updateRecord(form: NgForm) {
    this.service.putAddInstitute().subscribe(
      res => {
        this.resetForm(form);
      },
      err => {
        console.log(err);
        alert(err.error["UniqueInstituteName"]);
        this.InstituteNameError = err.error["UniqueInstituteName"];
      }
    );
  }


}


