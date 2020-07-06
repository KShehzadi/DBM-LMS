import { Component, OnInit, VERSION } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl, ValidatorFn } from '@angular/forms';
import { CoursesService } from 'src/app/shared/CoursesService/courses.service';
import { Courses } from 'src/app/shared/CoursesModelClass/courses.model';
import { Router } from '@angular/router';
import { SignInService } from 'src/app/shared/SignInService/sign-in.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-allcourses',
  templateUrl: './allcourses.component.html',
  styleUrls: ['./allcourses.component.css']
})
export class AllcoursesComponent implements OnInit {
  form: FormGroup;
  ngVersion: string = VERSION.full;
  matVersion: string = '5.1.0';
  breakpoint: number;
  lst: Courses[];
  userDetails;
  constructor(private Service2: SignInService, private service: CoursesService, private router: Router) { }

  ngOnInit() {

    this.service.editFlag = false;
    if (localStorage.getItem('token')) {
      var i = localStorage.getItem('Id');




    this.Service2.getUserProfile().subscribe(
      res => {
        console.log(res);
        this.userDetails = res;
        // test1 = this.userDetails['tempId'];
        // alert(test1);
        // this.service.formData = res as Courses;
        // CoursesService.id = this.userDetails.tempId;
        // alert(CoursesService.id);
        // this.service.formData = {
        //   id: CoursesService.id,
        //   name: '',
        //   email: '',
        //   courseCode: '',
        //   courseSession: '',
        //   courseSemester: ''
        // }
        //console.log(this.service.formData);
      },
      err => {
        console.log(err);
        //alert("err");
      }
    );

    //this.Service2.getUserRole();

      this.Service2.getUserRole(i);
      // console.log(this.service.lstTemp[0]['Designation']);
      // console.log(this.service.lstTemp);
      // this.service.designation = this.service.lstTemp[0]['designation'];
    }




    this.service.getAssignedCourses();


    // this.service.getCoursesList();
    // this.lst = this.service.list;
    // console.log(this.lst);


    if (window.innerWidth <= 800) {
      this.breakpoint = 2;
    }
    else if (window.innerWidth <= 500) {
      this.breakpoint = 1;
    }
    else {
      this.breakpoint = 4;
    }
    // this.breakpoint = (window.innerWidth <= 800 ) ? 2 :
    // (window.innerWidth <= 600) ? 1: 4;
    // this.breakpoint = (window.innerWidth <= 500) ? 1 : 4;
  }

  onResize(event) {
    if (event.target.innerWidth <= 670) {
      this.breakpoint = 1;
    }

    else {
      if (event.target.innerWidth <= 800) {
        this.breakpoint = 2;
      }
      else if (event.target.innerWidth <= 1100) {
        this.breakpoint = 3;
      }
      else {
        this.breakpoint = 4;
      }

    }
    //  this.breakpoint = (event.target.innerWidth <= 800) ? 2 :
    //  this.breakpoint =(event.target.innerWidth <= 600) ? 1:4;
    //   // this.breakpoint = (event.target.innerWidth <= 500) ? 1 : 4;
  }

  EnrolInCourse(C: Courses, form: NgForm) {
    this.service.formData = C;
    console.log(C);
    form.value.id = C.id;
    form.value.email = C.email;
    form.value.courseCode = C.courseCode;
    form.value.courseSession = C.courseSession;
    form.value.courseSemester = C.courseSemester;
    form.value.userId = localStorage.getItem('Id');
    console.log(form.value);
    alert("aa");
    //form.value.id = C.id;
    this.service.postEnrolmentRequests(form.value).subscribe(
      res => {

      },
      err => {

      }
    );
  }

  ViewCourse(C: Courses, form: NgForm) {
    this.service.formData = C;
    form.value.name = C.name;
    form.value.id = C.id;
    //alert(C.id);
    localStorage.setItem('CourseName', String(C.name));
    localStorage.setItem('CourseId', String(C.id));
    this.router.navigate(['/CourseDashboard']);
  }

  editCourse(C: Courses) {
    this.service.formData = C;
    this.service.editFlag = true;
    console.log(this.service.formData);
    // alert("stop");
    this.router.navigate(['/AddCourse']);
  }



}
