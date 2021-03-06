import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../../../app-common/angular-material.module';

import { IndexcardsCardComponent } from './indexcards-card.component';
import { ExamItemModule } from '../../exam-item/exam-item.module';
import { PostLinkModule } from '../../post-link/post-link.module';
import { PostBadgeModule } from '../../post-badge/post-badge.module';



@NgModule({
  declarations: [IndexcardsCardComponent],
  exports: [
    IndexcardsCardComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        AngularMaterialModule,
        ExamItemModule,
        PostLinkModule,
        PostBadgeModule
    ]
})
export class IndexcardsCardModule { }
