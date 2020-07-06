import { Component } from '@angular/core';

import {FormControl} from '@angular/forms';
export interface PeriodicElement {
 
  icons:string;
  Users:string;
  permission:string;
  SelectUser:string;
  Group:string;
 
}
export interface Food {
  value: string;
  viewValue: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
 {Group:'Admin',icons:'', Users:'', permission:'', SelectUser:''},
 {Group:'Teacher',icons:'', Users:'', permission:'', SelectUser:''}, 
 {Group:'Student',icons:'', Users:'', permission:'', SelectUser:''},  
];
@Component({
  selector: 'app-permission-management',
  templateUrl: './permission-management.component.html',
  styleUrls: ['./permission-management.component.css'],
})
export class PermissionManagementComponent{
  dataSource = ELEMENT_DATA;
  displayedColumns :string[]=['icons', 'Group', 'Users', 'SelectUser', 'permission'];
 
  foods: Food[] = [
    {value: 's0', viewValue: 'User1'},
    {value: 's1', viewValue: 'User2'},
    {value: 's2', viewValue: 'User3'}
  ];
  
  permissions = new FormControl();
  permissionList: string[] = ['Abc', 'Xyz', 'Klm', 'per1'];
}
