import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddNotesComponent } from './pages/add-notes/add-notes.component';


const routes: Routes = [
  { path: 'AddNotes', component: AddNotesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }
