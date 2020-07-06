import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAssignmentsComponent } from './pages/add-assignments/add-assignments.component';
import { SubmitAssignmentComponent } from './pages/submit-assignment/submit-assignment.component';
import { AuthGuard } from '../shared/auth/auth.guard';


const routes: Routes = [
  {
    path: 'AddAssignment',
    component: AddAssignmentsComponent,
    canActivate: [AuthGuard],
    data: { permittedRoles: ['Teacher'] }
  },
  {
    path: 'SubmitAssignment',
    component: SubmitAssignmentComponent,
    canActivate: [AuthGuard],
    data: { permittedRoles: ['Student'] }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignmentsRoutingModule { }
