import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";

import { MatGridListModule } from '@angular/material/grid-list'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatDatetimepickerModule } from "@mat-datetimepicker/core";
// import { MatNativeDateModule } from '@angular/material';
// import { MatMomentDateModule } from "@angular/material-moment-adapter";


import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from './shared/shared.module';
import { CoursesModule } from './courses/courses.module';
import { MatCardModule } from '@angular/material/card';
import { ToastrModule } from 'ngx-toastr';


import { LoginRegistrationModule } from './login-registration/login-registration.module';
import { AnnouncementsModule } from './announcements/announcements.module';
import { PermissionsModule } from './permissions/permissions.module';
import { NotesModule } from './notes/notes.module';
import { MainPageComponent } from './main-page/main-page.component';
import { AssignmentsModule } from './assignments/assignments.module';
import { TeacherModule } from './teacher/teacher.module';
import { InstituteModule } from './institute/institute.module';
import { ForbiddenPanelModule } from './forbidden-panel/forbidden-panel.module'
import { AddInstituteServiceService } from './shared/InstituteService/add-institute-service.service';
import { SignInService } from './shared/SignInService/sign-in.service';
import { AuthInterceptor } from './shared/auth/auth.interceptor';
import { CoursesService } from './shared/CoursesService/courses.service';










@NgModule({

  declarations: [
    AppComponent,

    MainPageComponent,





  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatGridListModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    SharedModule,
    CoursesModule,
    LoginRegistrationModule,
    AnnouncementsModule,
    PermissionsModule,
    NotesModule,
    AssignmentsModule,
    TeacherModule,
    InstituteModule,
    ForbiddenPanelModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    // MatDatetimepickerModule,
    // MatNativeDateModule,
    // MatMomentDateModule
  ],
  providers: [CoursesService, AddInstituteServiceService, SignInService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
