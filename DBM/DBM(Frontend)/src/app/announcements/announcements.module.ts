import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnnouncementsRoutingModule } from './announcements-routing.module';
import { AllAnnouncementsComponent } from './pages/all-announcements/all-announcements.component';
import { AnnouncementsComponent } from './pages/announcements.component';


import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatButtonModule } from '@angular/material/button';



import { AddAnnouncementsComponent } from './pages/add-announcements/add-announcements.component';

@NgModule({
  declarations: [AllAnnouncementsComponent, AnnouncementsComponent, AddAnnouncementsComponent],
  exports: [
    AllAnnouncementsComponent,
    AnnouncementsComponent
  ],
  imports: [
    CommonModule,
    AnnouncementsRoutingModule,
    
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    CKEditorModule,
    MatButtonModule
  ]
})
export class AnnouncementsModule { }
