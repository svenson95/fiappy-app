import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../services/header.service';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/user';
import { DataService } from '../../services/data/data.service';
import { SchoolWeek } from '../../models/school-week';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: User;
  schoolWeek: SchoolWeek;
  scheduleSubstitutions = false;

  constructor(private headerService: HeaderService,
              private authService: AuthService,
              public dataService: DataService
  ) {
    this.headerService.setPageTitle('Dashboard');
    this.user = this.authService.user;
  }

  ngOnInit(): void {
    this.setupComponent();
  }

  /* -- Component functions -- */
  setupComponent(): void {

    if (!this.dataService.dashboard) {
      this.dataService.dashboard = {
        allLessons: undefined,
        lessonsPercentage: undefined,
        nextLesson: undefined,
        nextExams: undefined,
        schoolNews: undefined,
      };

      this.dataService.getNewsList().subscribe(response => {
        this.dataService.dashboard.schoolNews = response;
      });
      this.fetchAllLessons();
      this.fetchNextExams();
      this.fetchSchoolWeek();
    } else {
      this.schoolWeek = this.dataService.schoolWeek;

      if (!this.dataService.dashboard.nextLesson && !this.dataService.dashboard.lessonsPercentage) {
        this.fetchNextLesson(this.dataService.dashboard.allLessons);
      }
    }
  }

  /* -- Get all lessons for calculating user progress -- */
  fetchAllLessons(): void {
    this.dataService.getAllLessons().subscribe(
      (lessons) => {
        this.dataService.dashboard.allLessons = lessons;
        this.fetchNextLesson(lessons);
      }, (error) => {
        console.log('error while GET all-lessons', error);
      }
    );
  }

  /* -- Get next lesson & lessons percentage for user progress module -- */
  fetchNextLesson(lessons): void {
    this.dataService.getSubjectPost(lessons[this.authService.user.progress.length]).subscribe(
      (nextLesson) => {
        this.dataService.dashboard.nextLesson = nextLesson;
        this.dataService.dashboard.lessonsPercentage = (this.authService.user.progress.length / lessons.length) * 100;
      }, (error) => {
        console.log('error while GET next-lesson', error);
      }
    );
  }

  fetchNextExams(): void {
    this.dataService.getExamDates().subscribe(
        (exams) => {
          const openExams = [];
          exams.forEach(exam => {
            const today = new Date();
            const examDate = new Date(exam.date);

            if (today < examDate) {
              openExams.push(exam);
            }
          });
          openExams.sort((a, b) => {
            if (a.date > b.date) { return 1; }
            if (a.date < b.date) { return -1; }
            return 0;
          });
          this.dataService.dashboard.nextExams = openExams;
        }, (error) => {
          console.log('error while GET exam-dates', error);
        }
    );
  }

  /* -- Get current school week card with all lessons -- */
  fetchSchoolWeek(): void {
    this.dataService.getSchoolWeek(this.dataService.schoolWeekValue).subscribe((response) => {
      this.schoolWeek = response;
      this.dataService.schoolWeek = response;
    });
  }

}
