import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {
  GetUser,
  UpdateUsersInfo,
  DeleteUser,
  GetAllMovies,
  GetFavoriteMovies,
  DeleteMovie
} from '../fetch-api-data.service';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: ''};
  movies: any[] = [];
  favoriteMovies: any[] = [];
  favoriteMoviesIDs: any[] = [];

  constructor(
    public fetchApiData: UpdateUsersInfo,
    public fetchApiDataAllMovies: GetAllMovies,
    public fetchApiDataUser: GetUser,
    public fetchApiDataFavMovies: GetFavoriteMovies,
    public fetchApiDataDeleteMovie: DeleteMovie,
    public fetchApiDataDeleteUser: DeleteUser,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getFavoriteMovies();
  }

  getFavoriteMovies(): void {
    const user = localStorage.getItem('user');
    console.log(user);

    this.fetchApiDataUser.getUser(user).subscribe((resp: any) => {
      this.favoriteMoviesIDs = resp.FavoriteMovies;
      console.log(this.favoriteMoviesIDs);
      return this.favoriteMoviesIDs;
    });
    setTimeout(() => {
      this.getMovies();
    }, 200);
  }

  getMovies(): void {
    this.fetchApiDataAllMovies.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      this.movies.forEach((movie) => {
        if (this.favoriteMoviesIDs.includes(movie._id))
        this.favoriteMovies.push(movie);
      });
      console.log(this.favoriteMovies);
      return this.favoriteMovies;
    });
  }

  deleteFavoriteMovie(id: string, title: string): void {
    this.fetchApiDataDeleteMovie.deleteMovie(id).subscribe((resp: any) => {
      console.log(resp);
      window.location.reload();
    });
  }

  updateUsersInfo(): void {
    this.fetchApiData.updateUsersInfo(this.userData).subscribe((result) => {
      console.log(result);
      this.snackBar.open('You profile was updated', 'OK', {
        duration: 3000,
        verticalPosition: 'top'
      });
    },
      (result) => {
        console.log(result);
        this.snackBar.open(result, 'OK', {
          duration: 5000
        });
      });
  }

  openSynopsisDialog(description: string, image: string): void {
    this.dialog.open(MovieSynopsisComponent, {
      data: { description, image },
      width: '550px',
      height: '600px',
    });
  }

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(MovieGenreComponent, {
      data: { name, description },
      width: '550px',
      height: '600px'
    });
  }

  openDirectorDialog(name: string, bio: string, birth: string, death: string): void {
    this.dialog.open(MovieDirectorComponent, {
      data: { name, bio, birth, death },
      width: '550px',
      height: '600px'
    });
  }

}
