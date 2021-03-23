import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, filter, tap } from 'rxjs/operators';

import { HeaderService } from '../../services/header.service';
import { AuthService } from '../../services/auth/auth.service';
import { LoadingService } from '../../services/loading.service';
import { SidenavService } from '../../services/sidenav.service';
import { SearchPostService } from '../../services/data/search-post.service';

import { LogoutDialogComponent } from '../../components/logout-dialog/logout-dialog.component';
import { ImageManagerDialogComponent } from '../../components/image-manager-dialog/image-manager-dialog.component';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {

  loadingSubscription: Subscription;
  isLoading: boolean;
  isScrolled: boolean;

  @Input() isMobile;
  @Input('sidenav') sidenav;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  constructor(public router: Router,
              public headerService: HeaderService,
              public authService: AuthService,
              public themeService: ThemeService,
              public loadingService: LoadingService,
              private sidenavService: SidenavService,
              public searchPostService: SearchPostService,
              public dialog: MatDialog,
  ) {
    this.loadingSubscription = this.loadingService.loading$.pipe(delay(0)).subscribe(
      (status: boolean) => {
        this.isLoading = status;
      }
    );
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.debounceSearchInput();
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }

  debounceSearchInput(): void {
    if (this.searchInput) {
      fromEvent(this.searchInput.nativeElement, 'keyup')
        .pipe(
          filter(Boolean),
          debounceTime(500),
          distinctUntilChanged(),
          tap(ev => {
            this.searchForPost();
          })
        )
        .subscribe();
    }
  }

  async openLogoutDialog(): Promise<void> {
    await this.dialog.open(LogoutDialogComponent, {
      restoreFocus: true,
      panelClass: 'logout-modal'
    });
  }

  async openImageManager(): Promise<void> {
    await this.dialog.open(ImageManagerDialogComponent, {
      restoreFocus: true,
      panelClass: 'image-manager-modal'
    });
  }

  closeSidenav(): void {
    if (this.sidenavService.isOpen() && this.isMobile.matches) {
      this.sidenavService.close();
    }
  }

  goToSubject(): void {
    const subjectUrl = this.router.url.substring(0, this.router.url.indexOf('/', 2));
    if (subjectUrl && this.router.url !== subjectUrl) {
      this.router.navigateByUrl(subjectUrl);
    }
  }

  openSearchView(): void {
    if (this.searchInput.nativeElement.value !== '' && this.searchInput.nativeElement.value !== undefined) {
      this.router.navigateByUrl('search/' + this.searchInput.nativeElement.value);
    } else {
      this.router.navigateByUrl('search');
    }
  }

  searchForPost(): void {
    if (this.searchInput.nativeElement.value !== '') {
      this.searchPostService.searchPosts(this.searchInput.nativeElement.value).subscribe((response) => {
        this.searchPostService.searchResults$.next(response);
      });
    }
  }

}
