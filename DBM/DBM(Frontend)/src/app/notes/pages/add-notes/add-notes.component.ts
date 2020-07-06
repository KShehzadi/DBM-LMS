import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LectureService } from 'src/app/shared/LectureServiceClass/lecture.service';
import { SignInService } from 'src/app/shared/SignInService/sign-in.service';
import { SignUpService } from 'src/app/shared/SignUpService/sign-up.service';

@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.css']
})
export class AddNotesComponent implements OnInit {
  public progress: number;
  public message: string;
  @Output() public onUploadFinished = new EventEmitter();

  form: FormGroup;
  selectedFile = null;
  temp: String = null;
  
  userDetails;
  constructor(private service: LectureService,private service2:SignInService, private http: HttpClient,  private toastr: ToastrService, private router: Router) {

  }
  onFileSelected(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];
    //this.onUploadv();
  }

  ngOnInit() {
    this.resetForm();
    this.service2.getUserProfile().subscribe(
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
    this.service.formDataNotes = {
      Id: 0,
      FilePath: '',
      Name: '',
      courseId: '',
      lectureId:'',
      userId:''
    }
  }

  onSubmit(form: NgForm) {
    
    this.service.onUploadNotes(this.selectedFile).subscribe(
      res => {
        // console.log(res);
        // this.temp = res.toString();
        // console.log(this.temp);
      }
    );
    this.insertRecord(form);
    this.toastr.success('Notes Uploaded Successfully', '');
  }

  insertRecord(form: NgForm) {
    
    // console.log(form.value.SubmissionDate);
    // form.value.SubmissionDate = form.value.SubmissionDate.getDate() + 1;
    form.value.FilePath = this.selectedFile.name;
    form.value.courseId = localStorage.getItem('CourseId');
    form.value.lectureId = localStorage.getItem('LectureId');
    form.value.userId =  this.userDetails.email;
    this.service.postUploadNotes(form.value).subscribe(
      res => {
        this.resetForm(form);
        //this.router.navigate(['/LectureVideos']);
      },
      err => {
        console.log(err);
      }
    )
  }

}
