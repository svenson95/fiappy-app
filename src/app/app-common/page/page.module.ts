import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';

import { PageComponent } from './page.component';

import { HeaderComponent } from '../header/header.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { ContentComponent } from '../content/content.component';
import { AppIconComponent } from '../app-icon/app-icon.component';
import { LogoutDialogComponent } from '../../components/dialogs/logout-dialog/logout-dialog.component';
import { ImageManagerDialogModule } from '../../components/dialogs/image-manager-dialog/image-manager-dialog.module';
import { DeleteImageDialogModule } from '../../components/dialogs/delete-image-dialog/delete-image-dialog.module';
import { SearchbarModule } from '../../components/searchbar/searchbar.module';


@NgModule({
  declarations: [
    PageComponent,
    HeaderComponent,
    SidenavComponent,
    ContentComponent,
    AppIconComponent,
    LogoutDialogComponent
  ],
  exports: [PageComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule,
    FormsModule,
    ImageManagerDialogModule,
    DeleteImageDialogModule,
    SearchbarModule
  ]
})
export class PageComponentModule { }
