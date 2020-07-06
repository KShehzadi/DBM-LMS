import { Component } from '@angular/core';
import {FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent {

  FirstName = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]);
  LastName = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]);
  email = new FormControl('', [Validators.required, Validators.email]);
  CNIC = new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(13), Validators.minLength(13)]);
  PhoneNo = new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(11), Validators.minLength(11)]);
  DateOfBirth = new FormControl('', [Validators.required]);
 

  getErrorMessageEmail() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  getErrorMessageLastName() {
    return this.LastName.hasError('required') ? 'You must enter a value' :
      this.LastName.hasError('pattern') ? 'Last Name should not have numbers' :
        '';
  }

  getErrorMessageFirstName() {
    return this.FirstName.hasError('required') ? 'You must enter a value' :
      this.FirstName.hasError('pattern') ? 'First Name should not have numbers' :
        '';
  }

  getErrorMessageCNIC() {
    return this.CNIC.hasError('required') ? 'You must enter a value' :
      this.CNIC.hasError('pattern') ? 'CNIC should not have alphabets' :
        this.CNIC.hasError('maxlength') ? 'CNIC must have 13 digits' :
          this.CNIC.hasError('minlength') ? 'CNIC must have 13 digits' :
            '';
  }
  getErrorMessageCellNo() {
    return this.PhoneNo.hasError('required') ? 'You must enter a value' :
      this.PhoneNo.hasError('pattern') ? 'Contact No should not have alphabets' :
        this.PhoneNo.hasError('maxlength') ? 'Contact must have 11 digits' :
          this.PhoneNo.hasError('minlength') ? 'Contact No must have 11 digits' :
            '';
  }
  getErrorMessageDOB() {
    return this.FirstName.hasError('required') ? 'You must enter a date' :
      '';
  }

  permissions = new FormControl();
  permissionList: string[] = ['Abc', 'Xyz', 'Klm', 'per1'];

}
