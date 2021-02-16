import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GetAllMovies, AddMovie } from '../fetch-api-data.service';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];

  constructor(
    public fetchApiData: GetAllMovies,
    public fetchApiData2: AddMovie,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  addMovie(id: string, Title: string): void {
    this.fetchApiData2.addMovie(id).subscribe((resp: any) => {
      console.log(resp);
      this.snackBar.open(
        `"${Title}" added to your favotites`,
        'OK',
        {
          duration: 2000,
          verticalPosition: 'top'
        }
      );
    });
  }

  openSynopsisDialog(Description: string, Image: string): void {
    this.dialog.open(MovieSynopsisComponent, {
      data: { Description, Image },
      width: '550px',
      height: '500px',
    });
  }

  openGenreDialog(Name: string, Description: string): void {
    this.dialog.open(MovieGenreComponent, {
      data: { Name, Description },
      width: '550px',
      height: '500px',
    });
  }

  openDirectorDialog(Name: string, Bio: string, Birth: string, Death: string): void {
    this.dialog.open(MovieDirectorComponent, {
      data: { Name, Bio, Birth, Death },
      width: '550px',
      height: '500px',
    });
  }
}




