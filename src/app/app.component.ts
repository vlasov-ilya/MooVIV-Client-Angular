import { Component } from '@angular/core';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MooVIV-Client-Angular';

  constructor(public dialog: MatDialog) { }
// This is function that will open the dialog when signUp button is clicked
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      // dialog width
      width: '280px'
    });
  }
// This is function that will open the dialog when logIN button is clicked
  openLogInDialog(): void {
    this.dialog.open(UserLoginFormComponent , {
      width: '280px'
    });

  }
}
