import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
export interface PeriodicElement {


  FirstName: string;
  LastName: string;
  ContactNo: string;
  UniversityName: string;
  CNIC: string;
  DateOfBirth: string;
  Edit: string;
  Delete: string;
  Email: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {
    FirstName: 'ABC',
    LastName: 'XYZ',
    ContactNo: '123',
    UniversityName: 'UET',
    CNIC: '1111111111111',
    DateOfBirth: moment().format('10/7/2019'),
    Edit: '',
    Delete: '',
    Email: 'abc@gmail.com'
  },
 
];

@Component({
  selector: 'app-all-teachers',
  templateUrl: './all-teachers.component.html',
  styleUrls: ['./all-teachers.component.css']
})




export class AllTeachersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  dataSource = ELEMENT_DATA;
  displayedColumns :string[]=['FirstName', 'LastName', 'CNIC', 'Email', 'ContactNo', 'DateOfBirth', 'UniversityName', 'Edit', 'Delete'];

}
