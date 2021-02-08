import { Component, OnInit, Input } from '@angular/core';
import { UserLoginService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: ''};

    constructor(
      public fetchApiData: UserLoginService,
      public dialogRef: MatDialogRef<UserLoginFormComponent>,
      public snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
    }

   // This is function responsible for sending the form inputes to the backend
    logInUser(): void {
      this.fetchApiData.userLogin(this.userData).subscribe((response) => {
              // successful user login
      this.dialogRef.close(); // This will close the modal on success!
      console.log(response);
      this.snackBar.open('user loged-in!', 'OK', {
        duration: 2000
      });
    }, (response) => {
      console.log(response);
      this.snackBar.open(response, 'OK', {
        duration: 200
      });
    });
  }

}
