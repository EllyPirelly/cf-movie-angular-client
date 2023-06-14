import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  // defines the HTML element into which this component will render
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
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  // called once the component has recieved all its inputs
  ngOnInit(): void {
  }

  /**
   * fetches user login from FetchApiDataService userLogin(), sets localStorage and sends form inputs to backend
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((response) => {
      localStorage.setItem('user', response.user.userName);
      localStorage.setItem('token', response.token);

      // closes modal on success
      this.dialogRef.close();

      this.snackBar.open('user logged in successfully!', 'OK', {
        duration: 6000
      });

      // once login was successful, navigate to movies
      this.router.navigate(['movies']);

    }, (response) => {
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }
}
