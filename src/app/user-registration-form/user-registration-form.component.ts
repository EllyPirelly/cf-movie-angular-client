import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  // defines the HTML element into which this component will render
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})

export class UserRegistrationFormComponent implements OnInit {

  // defines the components input
  @Input() userData = {
    userName: '',
    password: '',
    email: '',
    birthDate: ''
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    // modal, toggled at success/no success
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    // user notification
    public snackBar: MatSnackBar) { }

  // called once the component has recieved all its inputs
  ngOnInit(): void {
  }

  /**
   * fetches user registration from FetchApiDataService userRegistration() and sends form inputs to backend
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
      // closes modal on success
      this.dialogRef.close();
      this.snackBar.open('user registered successfully!', 'OK', {
        duration: 2000
      });

    }, (response) => {
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }
}
