import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent implements OnInit {

  movies: any[] = [];
  favorites: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  // lifecycle hook; is called when Angular is done creating the component
  // evoked immediately after the entire component has been instantiated
  // similar to componentDidMount
  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      this.getFavoriteMoviesList();
      return this.movies;
    });
  }

  getFavoriteMoviesList(): void {
    this.fetchApiData.getFavoriteMovies().subscribe((resp: any) => {
      this.favorites = resp.favoriteMovies;
      console.log(this.favorites);
      return this.favorites;
    });
  }

  openMovieDetails(
    imagePath: any,
    title: string,
    description: string
  ): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        imagePath: imagePath,
        title: title,
        description: description
      },
      width: '100%'
    });
  }

  openDirector(
    directorName: string,
    bio: string
  ): void {
    this.dialog.open(DirectorViewComponent, {
      data: {
        directorName: directorName,
        bio: bio
      },
      width: '100%'
    });
  }

  openGenre(
    genreName: string,
    description: string
  ): void {
    this.dialog.open(GenreViewComponent, {
      data: {
        genreName: genreName,
        description: description
      },
      width: '100%'
    });
  }

  addFavoriteMovie() {
    //
  }

  removeFavoriteMovie() {
    //
  }
}
