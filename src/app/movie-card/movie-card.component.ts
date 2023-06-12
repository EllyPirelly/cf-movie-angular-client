import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  favoriteMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) { }

  // lifecycle hook; is called when Angular is done creating the component
  // evoked immediately after the entire component has been instantiated
  // similar to componentDidMount
  ngOnInit(): void {
    this.getMovies();
    this.getFavorites();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      // console.log(this.movies);
      return this.movies;
    });
  }

  openMovieDetails(
    imagePath: any,
    title: string,
    description: string,
    directorName: string,
    bio: string
  ): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        imagePath: imagePath,
        title: title,
        description: description,
        directorName: directorName,
        bio: bio
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

  getFavorites(): void {
    this.fetchApiData.getFavoriteMovies().subscribe((resp: any) => {
      this.favoriteMovies = resp;
      return this.favoriteMovies;
    });
  }

  addFavorite(id: string): void {
    this.fetchApiData.addFavoriteMovie(id).subscribe((result) => {
      this.snackBar.open('Movie added', 'OK', {
        duration: 2000
      });
      this.ngOnInit();
    });
  }

  isFavorite(id: string): boolean {
    return this.favoriteMovies.includes(id);
  }

  removeFavorite(id: string): void {
    this.fetchApiData.deleteMovie(id).subscribe((result) => {
      this.snackBar.open('Movie removed', 'OK', {
        duration: 2000
      });
      this.ngOnInit();
    });
  }
}
