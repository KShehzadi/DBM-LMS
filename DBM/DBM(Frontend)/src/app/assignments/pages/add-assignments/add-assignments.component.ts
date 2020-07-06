import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { AssignmentService } from 'src/app/shared/AssignmentService/assignment.service';
import { SignInService } from 'src/app/shared/SignInService/sign-in.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-assignments',
  templateUrl: './add-assignments.component.html',
  styleUrls: ['./add-assignments.component.css']
})
export class AddAssignmentsComponent implements OnInit {
  public progress: number;
  public message: string;
  @Output() public onUploadFinished = new EventEmitter();

  form: FormGroup;
  selectedFile = null;
  temp: String = null;
  userDetails;

  // constructor(private fb: FormBuilder, private http: HttpClient) {

  // }

  constructor(private service: AssignmentService, private http: HttpClient, private service2: SignInService, private toastr: ToastrService) {

  }

  onFileSelected(event) {
    // console.log(event);
    this.selectedFile = event.target.files[0];
    // this.onUploadAssignment();
  }

  // onUploadAssignment(selectedFile) {
  //   const fd = new FormData();
  //   fd.append('image', this.selectedFile, this.selectedFile.name);
  //   this.http.post('http://localhost:3845/api/Assignment/Upload', fd)
  //   .subscribe(
  //     res => {
  //       console.log(res);
  //     }
  //   );
  // }




  ngOnInit() {
    // this.form = this.fb.group({
    //   file: []
    // })
    this.resetForm();
    this.service2.getUserProfile().subscribe(
      res => {
        this.userDetails = res;
      }
    )
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      Id: 0,
      SubmissionDate: new Date(),
      FilePath: '',
      Title: '',
      Email: '',
      StartDateTime: new Date()
    }
  }

  onSubmit(form: NgForm) {
    
    this.service.onUploadAssignment(this.selectedFile).subscribe(
      res => {
        console.log(res);
        this.temp = res.toString();
        console.log(this.temp);
      }
    );
    this.insertRecord(form);
    this.toastr.success('Assignment Uploaded Successfully', '');
  }

  insertRecord(form: NgForm) {
    
    // console.log(form.value.SubmissionDate);
    // form.value.SubmissionDate = form.value.SubmissionDate.getDate() + 1;
    var temp = form.value.SubmissionDate;
    form.value.SubmissionDate.setHours(temp.getHours() + 5);
    // alert(form.value.SubmissionDate);
    var temp2 = form.value.StartDateTime;
    form.value.StartDateTime.setHours(temp2.getHours() + 5);
    form.value.FilePath = this.selectedFile.name;
    form.value.Email = this.userDetails.email;
    this.service.postAddAssignment(form.value).subscribe(
      res => {
        this.resetForm(form);
      },
      err => {
        console.log(err);
      }
    )
  }

  convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("/");
  }


  // public uploadFile = (files) => {
  //   if (files.length === 0) {
  //     return;
  //   }
  //   let fileToUpload = <File>files[0];
  //   const formData = new FormData();
  //   formData.append('file', fileToUpload, fileToUpload.name);


  //   this.http.post('http://localhost:3845/api/Assignment', formData, {reportProgress: true, observe: 'events'})
  //     .subscribe(event => {
  //       if (event.type === HttpEventType.UploadProgress)
  //         this.progress = Math.round(100 * event.loaded / event.total);
  //       else if (event.type === HttpEventType.Response) {
  //         this.message = 'Upload success.';
  //         this.onUploadFinished.emit(event.body);
  //       }
  //     });
  // }



}
