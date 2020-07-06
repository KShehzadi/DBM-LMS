import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent } from './pages/courses.component';
import { AddCoursesComponent } from './pages/add-courses/add-courses.component';
import { AllcoursesComponent } from './pages/allcourses/allcourses.component';
import { CourseDashboardComponent } from './pages/course-dashboard/course-dashboard.component';
import { AssignCourseComponent } from './pages/assign-course/assign-course.component';
import { EnrollmentRequestsComponent } from './pages/enrollment-requests/enrollment-requests.component';
import { AuthGuard } from '../shared/auth/auth.guard';
// import { AllCoursesComponent } from './pages/all-courses/all-courses.component';

import{AddAnnouncementComponent} from './pages/add-announcement/add-announcement.component';
import{AddLecturesComponent} from './pages/add-lectures/add-lectures.component';
import { UploadLectureVideoComponent } from './pages/upload-lecture-video/upload-lecture-video.component';
import { AllVideosComponent } from './pages/all-videos/all-videos.component';
import { AllNotesComponent, NotesComponent } from '../notes';




const routes: Routes = [
  { 
    path: 'AddCourse',
    component: AddCoursesComponent,
    canActivate: [AuthGuard], 
    data: { permittedRoles: ['Admin'] }
  },
  { 
    path: 'AddAnnouncement',
    component: AddAnnouncementComponent,
    
  },
  {
    path: 'AllCourses',
    component: AllcoursesComponent,
    canActivate: [AuthGuard], 
    data: { permittedRoles: ['Admin', 'Teacher', 'Student'] }
  },
  {
    path: 'AssignCourse',
    component: AssignCourseComponent,
    canActivate: [AuthGuard], 
    data: { permittedRoles: ['Admin'] }
  },
  {
    path: 'EnrollmentRequests',
    component: EnrollmentRequestsComponent,
    canActivate: [AuthGuard], 
    data: { permittedRoles: ['Teacher'] }
  },
  {
    path: 'CourseDashboard',
    component: CourseDashboardComponent
  },
  {
    path:'AddLecture',
    component:AddLecturesComponent
  },
  {
    path:'UploadVideo',
    component:UploadLectureVideoComponent
  },
  {
    path:'LectureVideos',
    component:AllVideosComponent
  },
  {
    path:'LectureNotes',
    component:AllNotesComponent
  },
  {
    path:'AddLectureNote',
    component:NotesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
