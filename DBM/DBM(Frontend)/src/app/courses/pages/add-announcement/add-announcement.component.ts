import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, Validators } from '@angular/forms';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { AnnouncementService } from 'src/app/shared/AnnouncementService/announcement.service';
import { SignInService } from 'src/app/shared/SignInService/sign-in.service';
@Component({
  selector: 'app-add-announcement',
  templateUrl: './add-announcement.component.html',
  styleUrls: ['./add-announcement.component.css']
})
export class AddAnnouncementComponent implements OnInit {
  userDetails;

  public Editor = ClassicEditor;
  constructor(private service: AnnouncementService, private Service2: SignInService) { }

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
       // alert("err");
      }
    );
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.service.formData = {
      id: 0,
      Title: '',
      description: '',
      CourseName: '',
      email:'',
      postedDate:''
    }
  }

  onSubmit(form: NgForm) {

    //alert(this.userDetails.email);


    // console.log(form.value);
    this.insertRecord(form);
    // 
  }

    insertRecord(form: NgForm) {
      form.value.Email = this.userDetails.email;
      form.value.CourseName = localStorage.getItem('CourseName');
      this.service.postAddAnnouncement(form.value).subscribe(
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
