import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})

export class TopbarComponent {
  constructor(
    private router: Router
  ) { }

  // called once the component has recieved all its inputs
  ngOnInit(): void {
  }

  /**
   * navigates to '/movies'
   */
  toMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * navigates to '/profile'
   */
  toProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * logs out, clears localStorage, navigates to '/welcome'
   */
  logOut(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
    localStorage.clear();
  }
}
