import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatSelectModule } from '@angular/material/select'

import { InstituteRoutingModule } from './institute-routing.module';
import { AllInstitutesComponent } from './pages/all-institutes/all-institutes.component';
import { AddInstitutesComponent } from './pages/add-institutes/add-institutes.component';
import { InstitutesComponent } from './pages/institutes.component';
import { EditComponent } from './pages/edit/edit.component';


@NgModule({
  declarations: [AllInstitutesComponent, AddInstitutesComponent, InstitutesComponent, EditComponent],
  exports: [
    AllInstitutesComponent,
    AddInstitutesComponent,
    InstitutesComponent
  ],
  imports: [
    CommonModule,
    InstituteRoutingModule,

    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatFileUploadModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialFileInputModule,
    MatSelectModule
  ]
})
export class InstituteModule { }
