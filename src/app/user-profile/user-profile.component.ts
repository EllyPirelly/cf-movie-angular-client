import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  // defines the HTML element into which this component will render
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {

  user: any = {};

  // defines the components input
  @Input() updatedUser = {
    userName: '',
    password: '',
    email: '',
    birthDate: ''
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    // user notification
    public snackBar: MatSnackBar,
  ) { }

  // called once the component has recieved all its inputs
  ngOnInit(): void {
    this.getUser();
  }

  /**
   * fetch get user from FetchApiDataService getUser()
   * @returns object holding user information
   */
  getUser(): void {
    this.fetchApiData.getUser().subscribe((response: any) => {
      this.user = response;
      this.updatedUser.userName = this.user.userName;
      this.updatedUser.email = this.user.email;
      this.updatedUser.birthDate = this.user.birthDate;
      return this.user;
    })
  }

  /**
   * fetch update user from FetchApiDataService updateUser()
   * @returns object holding updated user information
   */
  updateProfile(): void {
    this.fetchApiData.updateUser(this.updatedUser).subscribe((response) => {
      this.snackBar.open('User profile successfuly updated', 'OK', {
        duration: 2000,
      });

      localStorage.setItem('userName', response.userName);

      this.getUser();
    })
  }

  /**
   * fetch delete user from FetchApiDataService deleteUser()
   * @returns message; redirect to welcome page
   */
  deleteUser(): void {
    if (
      confirm(
        'Are you sure you want to delete your accaunt?'
      )
    ) {
      this.fetchApiData.deleteUser().subscribe((result) => {
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open(
          'You have successfuly deleted your account.',
          'OK',
          {
            duration: 2000,
          }
        )
      });
    }
  }
}
