import { Component, OnInit } from '@angular/core';
import { MatDateFormats } from '@angular/material';
import { Moment } from 'moment';
import * as moment from 'moment';
import { RouterLink, Router } from '@angular/router';
import { Assignment } from 'src/app/shared/CourseAssignementModelClass/assignment.model';
import { AssignmentService } from 'src/app/shared/AssignmentService/assignment.service';

export interface PeriodicElement {
  name: string;
  position: number;
  Download: string;
  Delete: string;
  UploadedBy: string;
  PostedOn: string;
  SubmissionDate: string;
  Submit: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    name: 'Assignment 1',
    UploadedBy: 'ABC',
    PostedOn: moment().format('7/10/2019'),
    SubmissionDate: moment().format('7/10/2019'),
    Download: '',
    Delete: '',
    Submit: ''
  },
  {
    position: 2,
    name: 'Assignment 2',
    UploadedBy: 'ABC',
    PostedOn: moment().format('7/10/2019'),
    SubmissionDate: moment().format('7/10/2019'),
    Download: '',
    Delete: '',
    Submit: ''
  },
  {
    position: 3,
    name: 'Assignment 3',
    UploadedBy: 'ABC',
    PostedOn: moment().format('7/10/2019'),
    SubmissionDate: moment().format('7/10/2019'),
    Download: '',
    Delete: '',
    Submit: ''
  },
  {
    position: 4,
    name: 'Assignment 4',
    UploadedBy: 'ABC',
    PostedOn: moment().format('7/10/2019'),
    SubmissionDate: moment().format('7/10/2019'),
    Download: '',
    Delete: '',
    Submit: ''
  },
  {
    position: 5,
    name: 'Assignment 5',
    UploadedBy: 'ABC',
    PostedOn: moment().format('7/10/2019'),
    SubmissionDate: moment().format('7/10/2019'),
    Download: '',
    Delete: '',
    Submit: ''
  },
];

@Component({
  selector: 'app-all-assignments',
  templateUrl: './all-assignments.component.html',
  styleUrls: ['./all-assignments.component.css']
})
export class AllAssignmentsComponent implements OnInit {

  constructor(private service: AssignmentService, private router: Router) { }

  lst: Assignment[];

  displayedColumns: string[] = ['position', 'name', 'UploadedBy', 'PostedOn', 'SubmissionDate', 'Download', 'Delete', 'Submit'];
  dataSource = ELEMENT_DATA;

  ngOnInit() {
    this.service.getAssignmentList();

    this.lst = this.service.list;
  }

  Download(A: Assignment) {
    // alert("a");
    // console.log(A);
    // alert(A['id']);
    this.service.downloadFile(A);
  }

  Submit(A: Assignment) {
    alert(A["id"]);
    // console.log(A);
    localStorage.setItem('AssignmentId', String(A["id"]));
    this.router.navigate(['/SubmitAssignment']);
  }

}
