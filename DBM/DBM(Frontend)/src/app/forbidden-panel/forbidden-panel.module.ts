import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForbiddenPanelRoutingModule } from './forbidden-panel-routing.module';
import { ForbiddenPanelComponent } from './pages/forbidden-panel.component';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';


@NgModule({
  declarations: [ForbiddenPanelComponent, ForbiddenComponent],
  exports: [
    ForbiddenComponent
  ],
  imports: [
    CommonModule,
    ForbiddenPanelRoutingModule
  ]
})
export class ForbiddenPanelModule { }
