import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'cf-movie-angular-client';

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logOut(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }
}
