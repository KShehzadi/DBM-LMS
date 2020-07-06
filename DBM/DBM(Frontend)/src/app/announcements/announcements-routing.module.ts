import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddAnnouncementsComponent } from './pages/add-announcements/add-announcements.component';
import { AuthGuard } from '../shared/auth/auth.guard';

const routes: Routes = [
  {
    path: 'AddAnnouncements',
    component: AddAnnouncementsComponent,
    canActivate: [AuthGuard],
    data: { permittedRoles: ['Teacher'] }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnnouncementsRoutingModule { }
