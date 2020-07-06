import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import {MatFileUploadModule} from 'angular-material-fileupload';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import{ReactiveFormsModule} from '@angular/forms';
import{MaterialFileInputModule} from 'ngx-material-file-input';

import { SharedRoutingModule } from './shared-routing.module';
// import { HeaderComponent } from './layout/header/header.component';
// import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent, FooterComponent } from './layout';
import { HeaderLogoutComponent } from './layout/header-logout/header-logout.component';


@NgModule({
  declarations: [HeaderComponent, FooterComponent, HeaderLogoutComponent],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,

    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatFileUploadModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialFileInputModule

  ]
})
export class SharedModule { }
