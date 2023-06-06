import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { GenreViewComponent } from '../genre-view/genre-view.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent implements OnInit {

  movies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog
  ) { }

  // lifecycle hook; is called when Angular is done creating the component
  // evoked immediately after the entire component has been instantiated
  // similar to componentDidMount
  ngOnInit(): void {
    this.getMovies();
  }

  openMovieDetails(): void {
    this.dialog.open(MovieDetailsComponent, {
      width: '100%'
    });
  }

  openDirector(): void {
    this.dialog.open(DirectorViewComponent, {
      width: '100%'
    });
  }

  openGenre(): void {
    this.dialog.open(GenreViewComponent, {
      width: '100%'
    });
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }
}
