import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {
  // defines the components input
  @Input() userData = {
    userName: '',
    password: ''
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    // modal, toggled at success/no success
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    // user notification
    public snackBar: MatSnackBar) { }

  // is called once the component has recieved all its inputs
  ngOnInit(): void {
  }
  // sends form inputs to backend
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((response) => {
      // local storage
      console.log(response);
      localStorage.setItem('user', response.user.userName);
      localStorage.setItem('token', response.token);

      // closes modal on success
      this.dialogRef.close();
      console.log(response);

      this.snackBar.open('user logged in successfully!', 'OK', {
        duration: 6000
      });

    }, (response) => {
      console.log(response);
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }
}
