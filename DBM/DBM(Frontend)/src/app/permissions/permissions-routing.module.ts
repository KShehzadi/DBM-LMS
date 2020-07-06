import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddGroupsComponent } from './pages/add-groups/add-groups.component';
import { PermissionsComponent } from './pages/permissions.component';
import { PermissionManagementComponent } from './pages/permission-management/permission-management.component';

import{AssignGroupsComponent} from './pages/assign-groups/assign-groups.component';
const routes: Routes = [
  {
    path:'permission', component:PermissionsComponent,
    children:[
      {
        path:'AddGroup', component:AddGroupsComponent
      },
      {
        path:'permissionManagement', component:PermissionManagementComponent
      },
      {
        path:'AssignGroup', component:AssignGroupsComponent
      } 
    ]
  }
 
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionsRoutingModule { }
