import { Component, OnInit, Input } from '@angular/core';
// Import to class dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// Import to bring in API Calls
import { UserRegistrationService } from '../fetch-api-data.service';
// Import to display notifications back to user
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

    @Input() userData = { Username: '', Password: '', Email: '', Birthday: ''};

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  // This is function responsible for sending the form inputes to the backend
  registrationUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
      // successful user registration
      this.dialogRef.close(); // This will close the modal on success!
      console.log(response);
      this.snackBar.open('user registered!', 'OK', {
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

