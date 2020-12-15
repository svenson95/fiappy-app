import { AfterViewInit, Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from '../../services/header.service';
import { AuthService } from '../../services/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';
import { LoadingService } from '../../services/loading.service';
import { SidenavService } from '../../services/sidenav.service';
import { delay } from 'rxjs/operators';
import {LogoutDialogComponent} from '../../components/logout-dialog/logout-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {

  loadingSubscription: Subscription;
  isLoading = false;

  @Input() isMobile;
  @Input('searchValue') searchValue;
  @Input('sidenav') sidenav;

  constructor(public router: Router,
              public headerService: HeaderService,
              public authService: AuthService,
              public loadingService: LoadingService,
              private sidenavService: SidenavService,
              public dialog: MatDialog,
              @Inject(DOCUMENT) private document: HTMLDocument
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.loadingSubscription = this.loadingService.loading$.pipe(delay(0)).subscribe(
      (status: boolean) => {
        this.isLoading = status;
      }
    );
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }

  async openLogoutDialog(): Promise<void> {
    await this.dialog.open(LogoutDialogComponent, {
      restoreFocus: true,
      panelClass: 'logout-modal'
    });
  }

  toggleTheme(): void {
    this.authService.theme === 'dark' ? this.authService.theme = 'light' : this.authService.theme = 'dark';
    if (this.authService.theme === 'dark') {
      this.document.getElementsByClassName('mat-typography')[0].classList.remove('light-theme');
    } else {
      this.document.getElementsByClassName('mat-typography')[0].classList.add('light-theme');
    }
  }

  closeSidenav(): void {
    if (this.sidenavService.isOpen() && this.isMobile) {
      this.sidenavService.close();
    }
  }

}
