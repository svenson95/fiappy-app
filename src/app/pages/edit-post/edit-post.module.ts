import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../app-common/angular-material.module';

import { EditPostComponent } from './edit-post.component';
import { EditPostRoutingModule } from './edit-post-routing.module';
import { PostElementModule } from '../../components/post-element/post-element.module';
import { LessonFooterModule } from '../../components/lesson-footer/lesson-footer.module';
import { ImageManagerDialogComponent } from '../../components/image-manager-dialog/image-manager-dialog.component';



@NgModule({
  declarations: [
    EditPostComponent,
    ImageManagerDialogComponent
  ],
  exports: [
    EditPostComponent
  ],
  imports: [
    CommonModule,
    EditPostRoutingModule,
    AngularMaterialModule,
    PostElementModule,
    LessonFooterModule
  ]
})
export class EditPostModule { }
