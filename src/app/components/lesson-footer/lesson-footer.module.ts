import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LessonFooterComponent } from './lesson-footer.component';
import { AngularMaterialModule } from '../../app-common/angular-material.module';



@NgModule({
  declarations: [LessonFooterComponent],
  exports: [LessonFooterComponent],
  imports: [
    CommonModule,
    AngularMaterialModule
  ]
})
export class LessonFooterModule { }
