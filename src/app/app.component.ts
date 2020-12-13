import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ViewportScroller } from '@angular/common';
import { NavigationEnd , Router} from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnDestroy {
  title = 'fiappy-app';

  mobileQuery: MediaQueryList;
  tinyDisplay: MediaQueryList;
  MOBILE_QUERY_LISTENER: () => void;
  TINY_DISPLAY_LISTENER: () => void;

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private media: MediaMatcher,
              private router: Router,
              private viewportScroller: ViewportScroller,
              private authService: AuthService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.tinyDisplay = media.matchMedia('(max-width: 350px)');
    this.MOBILE_QUERY_LISTENER = () => changeDetectorRef.detectChanges();
    this.TINY_DISPLAY_LISTENER = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.MOBILE_QUERY_LISTENER);
    this.tinyDisplay.addListener(this.TINY_DISPLAY_LISTENER);

    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.viewportScroller.scrollToPosition([0, 0]));

    this.authService.authenticated().subscribe(
      (value) => {
        console.log('response authenticated', value);
      }, (error) => {
        console.log('ERROR authenticated', error);
      }
    );
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.MOBILE_QUERY_LISTENER);
    this.tinyDisplay.removeListener(this.TINY_DISPLAY_LISTENER);
  }
}
