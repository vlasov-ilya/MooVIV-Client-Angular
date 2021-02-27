import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  // This is function that will open the dialog when signUp button is clicked

  /**
   * function to open Registration Dialog on welcome page
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      // dialog width
      width: '280px'
    });
  }
  // This is function that will open the dialog when logIN button is clicked

  /**
   * function to open Login Dialog on welcome page
   */
  openLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });

  }

}
