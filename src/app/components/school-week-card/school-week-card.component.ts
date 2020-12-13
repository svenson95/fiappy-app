import { Component, Input, OnInit } from '@angular/core';
import { SchoolWeek } from '../../models/school-week';
import { getWeekday } from '../../app-common/getWeekday';
import { transformDate } from '../../app-common/transform-date';
import { subjects } from '../../../data/menu-items';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-school-week-card',
  templateUrl: './school-week-card.component.html',
  styleUrls: ['./school-week-card.component.scss']
})
export class SchoolWeekCardComponent implements OnInit {

  @Input() week?: SchoolWeek;

  getWeekday = getWeekday;
  transformDate = transformDate;
  schoolWeek: SchoolWeek;
  currentWeek: number;

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    if (this.week) {
      this.currentWeek = Number(this.week.schoolWeek);
    } else {
      this.currentWeek = this.dataService.schoolWeek;
    }

    this.dataService.getSchoolWeek(this.currentWeek).subscribe(response => {
      this.schoolWeek = response;
    });
  }

  fullSubjectName = (subject: string) => {
    return subjects.find(el => el.url.substring(1) === subject)?.title;
  }

  getPreviousWeek(): void {
    this.schoolWeek = undefined;
    this.currentWeek--;
    this.dataService.getSchoolWeek(this.currentWeek).subscribe(response => {
      this.schoolWeek = response;
    });
  }

  getNextWeek(): void {
    this.schoolWeek = undefined;
    this.currentWeek++;
    this.dataService.getSchoolWeek(this.currentWeek).subscribe(response => {
      this.schoolWeek = response;
    });
  }

}
