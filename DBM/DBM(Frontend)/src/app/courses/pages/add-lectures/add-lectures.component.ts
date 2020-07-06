import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgForm, FormControl, Validators } from '@angular/forms';
import { LectureService } from 'src/app/shared/LectureServiceClass/lecture.service';


@Component({
  selector: 'app-add-lectures',
  templateUrl: './add-lectures.component.html',
  styleUrls: ['./add-lectures.component.css']
})
export class AddLecturesComponent implements OnInit {

  constructor(private service: LectureService, private httpService: HttpClient) { }

 
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
      name: '',
      courseId:''
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
     // this.updateRecord(form);
    }
  }


  insertRecord(form: NgForm) {
    this.service.postAddLecture().subscribe(
      res => {
        this.resetForm(form);
      },
      err => {
        // console.log(err);
        // alert(err.error["UniqueInstituteName"]);
        // this.InstituteNameError = err.error["UniqueInstituteName"];
      }
    );
  }
}
