import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/shared/CoursesService/courses.service';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-assign-course',
  templateUrl: './assign-course.component.html',
  styleUrls: ['./assign-course.component.css']
})
export class AssignCourseComponent implements OnInit {

  constructor(private service: CoursesService, private httpService: HttpClient) { }

  ngOnInit() {
    this.resetForm();
    this.service.getCoursesList();
    this.service.getTeachersEmailList();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.service.formData = {
      id: 0,
      email: '',
      name: '',
      courseCode: '',
      courseSemester: '',
      courseSession: '',
      userId: 0
    }
  }

  onSubmit(form: NgForm) {
    this.service.postAssignTeacher(form.value).subscribe(
      res => {
        this.resetForm();
      },
      err => {
        console.log(err);
      }
    );
  }

}
