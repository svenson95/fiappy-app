import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';

import { PageComponent } from './page.component';
import { HeaderComponent } from '../header/header.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { ContentComponent } from '../content/content.component';
import { LogoutDialogComponent } from '../../components/logout-dialog/logout-dialog.component';


@NgModule({
  declarations: [
    PageComponent,
    HeaderComponent,
    SidenavComponent,
    ContentComponent,
    LogoutDialogComponent
  ],
  exports: [
    SidenavComponent,
    ContentComponent,
    PageComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule,
    FormsModule,
  ]
})
export class PageComponentModule { }
