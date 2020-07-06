import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
// import { MatDatetimepickerModule } from "@mat-datetimepicker/core";
// import { MatNativeDateModule } from '@angular/material';
// import { MatMomentDateModule } from "@angular/material-moment-adapter";


import { AssignmentsRoutingModule } from './assignments-routing.module';
import { AllAssignmentsComponent } from './pages/all-assignments/all-assignments.component';
import { AssignemntsComponent } from './pages/assignemnts.component';
import { AddAssignmentsComponent } from './pages/add-assignments/add-assignments.component';
import { SubmitAssignmentComponent } from './pages/submit-assignment/submit-assignment.component';


@NgModule({
  declarations: [AllAssignmentsComponent, AssignemntsComponent, AddAssignmentsComponent, SubmitAssignmentComponent],
  exports: [
    AllAssignmentsComponent,
    AssignemntsComponent,
  ],
  imports: [
    CommonModule,
    AssignmentsRoutingModule,

    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatFileUploadModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialFileInputModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    // MatDatetimepickerModule,
    // MatNativeDateModule,
    // MatMomentDateModule
  ]
})
export class AssignmentsModule { }
