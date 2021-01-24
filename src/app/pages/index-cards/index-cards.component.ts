import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../services/header.service';
import { subjects } from '../../../data/menu-items';
import { DataService } from '../../services/data/data.service';
import { Router } from '@angular/router';
import { IndexCards } from '../../models/index-cards';
import { SubjectPost } from '../../models/subject';

@Component({
  selector: 'app-index-cards',
  templateUrl: './index-cards.component.html',
  styleUrls: ['./index-cards.component.scss']
})
export class IndexCardsComponent implements OnInit {

  indexCardsContent: IndexCards;
  indexCardsDetails: SubjectPost;

  constructor(private headerService: HeaderService,
              private dataService: DataService,
              private router: Router
  ) {
    this.headerService.setPageTitle(
      subjects.find(sub => sub.url === router.url.substring(
        0, router.url.indexOf('/', 1)
      ))?.title
    );
    this.dataService.getIndexCards(router.url).subscribe(
      (data) => {
        this.indexCardsContent = data.content;
        this.indexCardsDetails = data.details;
      },
      (error) => {
        console.log('Error while GET index-cards', error);
      }
    );
  }

  ngOnInit(): void {
  }

}
