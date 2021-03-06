import { Component, OnInit } from '@angular/core';
import {HeaderService} from '../../services/header.service';

@Component({
  selector: 'fe-feedback',
  templateUrl: './feedback.component.html'
})
export class FeedbackComponent implements OnInit {

  constructor(private headerService: HeaderService) {
    this.headerService.setPageTitle('Feedback');
  }

  ngOnInit(): void {
  }

}
