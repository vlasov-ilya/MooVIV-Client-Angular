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
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  movies: any[] = [];
  favotiteMovies: any[] = [];
  favotiteMoviesIDs: any[] = [];

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
      this.favotiteMoviesIDs = resp.FavotiteMovies;
      console.log(this.favotiteMoviesIDs);
      return this.favotiteMoviesIDs;
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
        // if (this.favotiteMoviesIDs.includes(movie._id))
        //   this.favotiteMovies.push(movie);
      });
      console.log(this.favotiteMovies);
      return this.favotiteMovies;
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
