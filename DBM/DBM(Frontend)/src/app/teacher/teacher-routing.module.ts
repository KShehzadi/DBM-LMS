import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddTeacherComponent } from './pages/add-teacher/add-teacher.component';
import { AllTeachersComponent } from './pages/all-teachers/all-teachers.component';
import { EditComponent } from './pages/edit/edit.component'

const routes: Routes = [
  { path: 'AddTeacher', component: AddTeacherComponent },
  { path: 'AllTeacher', component: AllTeachersComponent },
  { path: 'Teacher/Edit', component: EditComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
