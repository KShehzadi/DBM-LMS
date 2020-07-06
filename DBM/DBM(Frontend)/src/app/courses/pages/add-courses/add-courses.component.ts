import { Component, OnInit } from '@angular/core';
import { VERSION } from '@angular/platform-browser-dynamic';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { CoursesService } from 'src/app/shared/CoursesService/courses.service';
import { SignInService } from 'src/app/shared/SignInService/sign-in.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-courses',
  templateUrl: './add-courses.component.html',
  styleUrls: ['./add-courses.component.css']
})
export class AddCoursesComponent implements OnInit {

  userDetails;
  //form: FormGroup;
  constructor(private service: CoursesService, private Service2: SignInService, private toaster:ToastrService) {

  }

  ngOnInit() {
    // this.form = this.fb.group({
    //   file: []
    // })
    if (this.service.editFlag == false) {
      this.resetForm();
    }

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
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      id: 0,
      name: '',
      email: '',
      courseCode: '',
      courseSession: '',
      courseSemester: '',
      userId: 0
    }
  }

  onSubmit(form: NgForm) {

    //alert(this.userDetails.email);


    // console.log(form.value);
    if (this.service.formData.id == 0) {
      this.insertRecord(form);
      this.toaster.success('Course Added Successfully', '');
    }
    else {
      this.updateRecord(form);
    }

  }

  updateRecord(form: NgForm) {
    form.value.email = this.userDetails.email;
    this.service.putAddCourse(form.value).subscribe(
      res => {
        this.resetForm(form);
      },
      err => {
        //alert(err);
        console.log(err);
      }
    )
  }

  insertRecord(form: NgForm) {
    form.value.Email = this.userDetails.email;
    this.service.postAddCourse(form.value).subscribe(
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
