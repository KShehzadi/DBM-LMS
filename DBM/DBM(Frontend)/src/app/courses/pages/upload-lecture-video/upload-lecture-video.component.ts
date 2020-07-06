import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { LectureService } from 'src/app/shared/LectureServiceClass/lecture.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-lecture-video',
  templateUrl: './upload-lecture-video.component.html',
  styleUrls: ['./upload-lecture-video.component.css']
})
export class UploadLectureVideoComponent implements OnInit {
  public progress: number;
  public message: string;
  @Output() public onUploadFinished = new EventEmitter();

  form: FormGroup;
  selectedFile = null;
  temp: String = null;
  //toastr: any;

  constructor(private service: LectureService, private http: HttpClient,  private toastr: ToastrService, private router: Router) { }

  onFileSelected(event) {
    //console.log(event);
    this.selectedFile = event.target.files[0];
    //this.onUploadv();
  }


 ngOnInit() {
    this.resetForm();
   
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formDataVideo = {
      Id: 0,
      FilePath: '',
      Name: '',
      courseId: '',
      lectureId:''
    }
  }

  onSubmit(form: NgForm) {
    
    this.service.onUploadVideo(this.selectedFile).subscribe(
      res => {
        // console.log(res);
        // this.temp = res.toString();
        // console.log(this.temp);
      }
    );
    this.insertRecord(form);
    this.toastr.success('Assignment Uploaded Successfully', '');
  }

  insertRecord(form: NgForm) {
    
    // console.log(form.value.SubmissionDate);
    // form.value.SubmissionDate = form.value.SubmissionDate.getDate() + 1;
    form.value.FilePath = this.selectedFile.name;
    form.value.courseId = localStorage.getItem('CourseId');
    form.value.lectureId = localStorage.getItem('LectureId');
    this.service.postUploadLecture(form.value).subscribe(
      res => {
        this.resetForm(form);
        this.router.navigate(['/LectureVideos']);
      },
      err => {
        console.log(err);
      }
    )
  }

}
