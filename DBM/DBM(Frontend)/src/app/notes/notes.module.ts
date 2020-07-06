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
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';

import { NotesRoutingModule } from './notes-routing.module';
import { AllNotesComponent } from './pages/all-notes/all-notes.component';
import { NotesComponent } from './pages/notes.component';
import { AddNotesComponent } from './pages/add-notes/add-notes.component';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@NgModule({
  declarations: [AllNotesComponent, NotesComponent, AddNotesComponent],
  exports: [
    AllNotesComponent,
    NotesComponent,
  ],
  imports: [
    CommonModule,
    NotesRoutingModule,

    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatFileUploadModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialFileInputModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class NotesModule {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
}
