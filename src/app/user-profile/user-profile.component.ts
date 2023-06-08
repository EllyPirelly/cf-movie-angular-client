import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {

  user: any = {};
  favoriteMovies: any[] = [];

  @Input() updatedUser = {
    userName: '',
    password: '',
    email: '',
    birthDate: ''
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.fetchApiData.getUser().subscribe((response: any) => {
      this.user = response;
      this.updatedUser.userName = this.user.userName;
      this.updatedUser.email = this.user.email;
      this.updatedUser.birthDate = this.user.birthDate;
      console.log(this.user);
      return this.user;
    })
  }

  updateProfile(): void {
    this.fetchApiData.updateUser(this.updatedUser).subscribe((response) => {
      this.snackBar.open('User profile successfuly updated', 'OK', {
        duration: 2000,
      });

      localStorage.setItem('userName', response.userName);

      this.getUser();
    })
  }

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
