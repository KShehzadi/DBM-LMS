import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherRoutingModule } from './teacher-routing.module';
import { AllTeachersComponent } from './pages/all-teachers/all-teachers.component';
import { TeacherComponent } from './pages/teacher.component';
import { AddTeacherComponent } from './pages/add-teacher/add-teacher.component';
import{MatCardModule} from '@angular/material/card';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select'
import { ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import { EditComponent } from './pages/edit/edit.component'
export class MyErrorStateMatcher implements ErrorStateMatcher {

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@NgModule({
  declarations: [AllTeachersComponent, TeacherComponent, AddTeacherComponent, EditComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    FormsModule,
    MatTableModule,
    ReactiveFormsModule,
    TeacherRoutingModule,
    MatDatepickerModule ,
    MatMomentDateModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCardModule
  ],
  providers: [
    MatDatepickerModule
  ]
})
export class TeacherModule { }
export class InputErrorStateMatcherExample {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();
}