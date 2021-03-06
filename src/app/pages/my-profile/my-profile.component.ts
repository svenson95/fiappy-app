import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SnackbarComponent } from '../../app-common/snackbar/snackbar.component';
import { EditUser, User } from '../../models/user';
import { HeaderService } from '../../services/header.service';
import { AuthService } from '../../services/auth/auth.service';
import { DataService } from '../../services/data/data.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'fe-my-profile',
  templateUrl: './my-profile.component.html'
})
export class MyProfileComponent implements OnInit {

  user: User;
  isChangingEmail: boolean;
  progressPercentage: number;

  /* -- Form values -- */
  formGroup: FormGroup;
  username: FormControl;
  email: FormControl;
  verificationCode: FormControl;
  password: FormControl;
  role: FormControl;
  progress: FormControl;
  theme: FormControl;

  @ViewChild('usernameInput') usernameInput: MatInput;
  @ViewChild('emailInput') emailInput: MatInput;
  @ViewChild('passwordInput') passwordInput: MatInput;

  constructor(private headerService: HeaderService,
              public authService: AuthService,
              public themeService: ThemeService,
              private dataService: DataService,
              private matSnackBar: MatSnackBar,
              private formBuilder: FormBuilder
  ) {
    this.headerService.setPageTitle('Mein Profil');
    this.user = this.authService.user;
    this.initFormGroup();
  }

  ngOnInit(): void {
    this.initUserProgress();
  }

  initUserProgress(): void {
    if (this.dataService.dashboard === undefined) {
      this.dataService.getAllLessons().subscribe(
        (lessons) => {
          this.progressPercentage = Math.floor((this.user.progress.length / lessons.length) * 100);
          this.progress.setValue(this.progressPercentage + ' %');
        }, (error) => {
          console.log('error while GET all-lessons', error);
        }
      );
    } else {
      this.progressPercentage = Math.floor((this.user.progress.length / this.dataService.dashboard.allLessons.length) * 100);
      this.progress.setValue(this.progressPercentage + ' %');
    }
  }

  initFormGroup(): void {
    this.username = new FormControl({ value: this.user.name, disabled: true }, {
      // validators: [Validators.required, Validators.minLength(4)],
      updateOn: 'submit'
    });
    this.email = new FormControl({ value: this.user.email, disabled: true }, {
      // validators: [Validators.required, Validators.minLength(4)],
      updateOn: 'submit'
    });
    this.verificationCode = new FormControl({ value: '' }, {
      // validators: [Validators.required, Validators.minLength(4)],
      updateOn: 'submit'
    });
    this.password = new FormControl({ value: this.user.password.substring(0, 8), disabled: true }, {
      // validators: [Validators.required, Validators.minLength(4)],
      updateOn: 'submit'
    });
    this.role = new FormControl({ value: this.user.role, disabled: true }, {
      // validators: [Validators.required, Validators.minLength(4)],
      updateOn: 'submit'
    });
    this.progress = new FormControl({ value: 0, disabled: true }, {
      // validators: [Validators.required, Validators.minLength(4)],
      updateOn: 'submit'
    });
    this.theme = new FormControl({ value: this.themeService.getActiveTheme().name, disabled: true }, {
      // validators: [Validators.required, Validators.minLength(4)],
      updateOn: 'change'
    });
    this.formGroup = this.formBuilder.group({
      username: this.username,
      email: this.email,
      verificationCode: this.verificationCode,
      password: this.password,
      role: this.role,
      progress: this.progress,
      theme: this.theme
    });
  }

  /* -- Component functions -- */
  resetProgress(): void {

  }

  markAllPostsAsRead(): void {

  }

  markAsDirty(event): void {
    if (this.username.value !== this.authService.user.name) {
      this.formGroup.markAsTouched();
    } else {
      this.formGroup.markAsUntouched();
    }
  }

  /* -- Change username -- */
  toggleChangeName(event): void {
    event.preventDefault();

    if (this.username.disabled) {
      this.username.enable();
      this.usernameInput.focus();
    } else {
      this.username.setValue(this.user.name);
      this.username.disable();
    }
  }

  saveChangeName(event): void {
    const updatedUser = {
      _id: this.authService.user._id,
      newName: this.username.value.toLowerCase()
    };

    this.authService.editUser(updatedUser).subscribe(
      (response) => {
        this.authService.user = response.user;
        this.matSnackBar.openFromComponent(SnackbarComponent, {
          duration: 3000,
          data: 'Benutzername geändert'
        });
      }, (errorRes) => {
        this.formGroup.controls['username'].setValue(this.authService.user.name);
        this.matSnackBar.openFromComponent(SnackbarComponent, {
          duration: 3000,
          data: 'Fehler: ' + typeof errorRes === 'string' ? errorRes : errorRes.error.message
        });
      }
    ).add(() => {
      this.username.disable();
    });
  }

  /* -- Change email -- */
  toggleChangeEmail(event): void {
    event.preventDefault();

    if (this.email.disabled) {
      this.email.enable();
      this.emailInput.focus();
    } else {
      this.email.setValue(this.user.email);
      this.email.disable();
    }
  }

  saveChangeEmail(event): void {
    const updatedUser = {
      _id: this.authService.user._id,
      email: this.email.value.toLowerCase()
    };

    this.authService.editUser(updatedUser).subscribe(
      (response) => {
        this.authService.user = response.user;
        this.isChangingEmail = true;
        this.matSnackBar.openFromComponent(SnackbarComponent, {
          duration: 3000,
          data: 'E-Mail geändert'
        });
      }, (errorRes) => {
        this.formGroup.controls['email'].setValue(this.authService.user.email);
        this.matSnackBar.openFromComponent(SnackbarComponent, {
          duration: 3000,
          data: 'Fehler: ' + typeof errorRes === 'string' ? errorRes : errorRes.error.message
        });
      }
    ).add(() => {
      this.email.disable();
    });
  }

  /* -- Change password -- */
  toggleChangePassword(event): void {
    event.preventDefault();

    if (this.password.disabled) {
      this.password.setValue('');
      this.password.enable();
      this.passwordInput.focus();
    } else {
      this.password.setValue(this.user.password.substring(0, 8));
      this.password.disable();
    }
  }

  saveChangePassword(event): void {
    const updatedUser = {
      _id: this.authService.user._id,
      password: this.password.value
    };

    this.authService.editUser(updatedUser).subscribe(
      (response) => {
        this.authService.user = response.user;
        this.matSnackBar.openFromComponent(SnackbarComponent, {
          duration: 3000,
          data: 'Passwort geändert'
        });
      }, (errorRes) => {
        this.matSnackBar.openFromComponent(SnackbarComponent, {
          duration: 3000,
          data: 'Fehler: ' + typeof errorRes === 'string' ? errorRes : errorRes.error.message
        });
      }
    ).add(() => {
      this.password.disable();
      this.password.setValue(this.user.password.substring(0, 8));
    });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.theme.setValue(this.themeService.getActiveTheme().name);
  }

  /* -- Change theme -- */
  saveChangeTheme(event): void {
    const updatedUser = {
      _id: this.authService.user._id,
      theme: this.themeService.getActiveTheme().name
    } as EditUser;

    this.authService.editUser(updatedUser).subscribe(
      (response) => {
        this.authService.user = response.user;
        this.matSnackBar.openFromComponent(SnackbarComponent, {
          duration: 3000,
          data: 'Standard-Theme geändert'
        });
      }, (errorRes) => {
        this.matSnackBar.openFromComponent(SnackbarComponent, {
          duration: 3000,
          data: 'Fehler: ' + typeof errorRes === 'string' ? errorRes : errorRes.error.message
        });
      }
    );
  }

  confirmChangedEmail(event: MouseEvent): void {
    // TODO: check input token and update user
    this.authService.confirmRegistration(this.authService.user.email, this.verificationCode.value, this.email.value.toLowerCase())
      .subscribe(response => {
        this.isChangingEmail = undefined;
      });
  }
}
