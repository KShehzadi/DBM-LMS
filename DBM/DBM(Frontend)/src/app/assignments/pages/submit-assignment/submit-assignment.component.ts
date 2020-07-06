import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AssignmentService } from 'src/app/shared/AssignmentService/assignment.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-submit-assignment',
  templateUrl: './submit-assignment.component.html',
  styleUrls: ['./submit-assignment.component.css']
})
export class SubmitAssignmentComponent implements OnInit {

  form: FormGroup;
  public RegistrationNumbers: any[] = [{
    RegNo: ''
  }];
  SelectedFile = null;
  temp: string = null;

  constructor(private service: AssignmentService, private http: HttpClient, private toastr: ToastrService) {

  }

  ngOnInit() {
    // this.form = this.fb.group({
    //   file: []
    // })
    this.resetForm();
  }

  onFileSelected(event) {
    this.SelectedFile = event.target.files[0];
  }

  addGroupMember() {
    this.RegistrationNumbers.push({
      RegNo: ''
    });
  }

  removeMember(i: number) {
    alert(i);
    this.RegistrationNumbers.splice(i, 1);
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formDataSubmitAssignment = {
      Id: 0,
      SubmissionDate: new Date(),
      FilePath: '',
      Title: '',
      Email: '',
      StartDateTime: new Date(),
      GroupId: 0,
      GroupRegNo: []
    }
  }

  onSubmit(form: NgForm) {
    // console.log(form);
    console.log(this.RegistrationNumbers);
    this.service.onSubmitAssignment(this.SelectedFile).subscribe(
      res => {
        this.temp = res.toString();
        console.log(this.temp);
      }
    );
    this.insertRecord(form);
  }

  insertRecord(form: NgForm) {
    console.log(form.value);
    var temp = form.value.SubmissionDate;
    form.value.SubmissionDate.setHours(temp.getHours() + 5);

    form.value.FilePath = this.SelectedFile.name;
    form.value.GroupRegNo = new Array<any>();
    for (let i = 0; i < this.RegistrationNumbers.length; i++) {
      // alert(temp);
      form.value.GroupRegNo.push(this.RegistrationNumbers[i]["RegNo"]);
    }
    // form.value.GroupRegNo = this.RegistrationNumbers as any[];
    console.log(form.value.GroupRegNo);
    this.service.postSubmitAssignment(form.value).subscribe(
      res => {
        this.toastr.success("Assignment Submitted Successfully");
        this.resetForm(form);
      }
    )
  }

}
