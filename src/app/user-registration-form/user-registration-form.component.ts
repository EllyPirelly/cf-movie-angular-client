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

  // is called once the component has recieved all its inputs
  ngOnInit(): void {
  }

  // sends form inputs to backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
      // Logic for a successful user registration goes here! (To be implemented)

      // closes modal on success
      this.dialogRef.close();
      console.log(response);
      this.snackBar.open('user registered successfully!', 'OK', {
        duration: 2000
      });

    }, (response) => {
      console.log(response);
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }

  // auto-generated code - looks different to what is shown in CF course
  // TODO: check, which code is correct
  // registerUser(): void {
  //   this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
  //     // Logic for a successful user registration goes here! (To be implemented)

  //     // closes modal on success
  //     this.dialogRef.close();

  //     this.snackBar.open(result, 'OK', {
  //       duration: 2000
  //     });

  //   }, (result) => {
  //     this.snackBar.open(result, 'OK', {
  //       duration: 2000
  //     });
  //   });
  // }
}
