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
import { MovieGenerComponent } from '../movie-genre/movie-genre.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  @Input() userData = { username: '', password: '', email: '', birthday: '' };

  movies: any[] = [];
  favotiteMovies: any[] = [];
  favotiteMoviesIds: any[] = [];

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
    this.getFavotiteMovies();
  }

  getFavotiteMovies(): void {
    const user = localStorage.getItem('user');
    console.log(user);

    this.fetchApiDataUser.getUser().subscribe((resp: any) => {
      this.favotiteMoviesIds = resp.FavotiteMovies;
      console.log(this.favotiteMoviesIds);
      return this.favotiteMovies;
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
        if (this.favotiteMoviesIds.includes(movie._id))
          this.favotiteMovies.push(movie);
      });
      console.log(this.favotiteMovies);
      return this.favotiteMovies;
    });
  }

  deleteFavoriteMovie(): void {
    this.fetchApiDataDeleteMovie.deleteMovie().subscribe((resp: any) => {
      console.log(resp);
      window.location.reload();
    });
  }

  updateUsersInfo(): void {
    this.fetchApiData.updateUsersInfo().subscribe((result) => {
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

  openSynopsisDialog(Description: string, Image: string): void {
    this.dialog.open(MovieSynopsisComponent, {
      data: { Description, Image },
      width: '550px',
      height: '600px',
    });
  }

  openGenreDialog(Name: string, Description: string): void {
    this.dialog.open(MovieGenerComponent, {
      data: { Name, Description },
      width: '550px',
      height: '600px'
    });
  }

  openDirectorDialog(Name: string, Bio: string, Birth: string, Death: string): void {
    this.dialog.open(MovieDirectorComponent, {
      data: { Name, Bio, Birth, Death },
      width: '550px',
      height: '600px'
    });
  }

}
