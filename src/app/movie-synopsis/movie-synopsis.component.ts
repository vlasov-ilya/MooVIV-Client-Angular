import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-synopsis',
  templateUrl: './movie-synopsis.component.html',
  styleUrls: ['./movie-synopsis.component.scss']
})
export class MovieSynopsisComponent {

  /**
   *
   * @param data Data which requested from DatBase
   * @param Title Movies title
   * @param Description Movies Desvription
   * @param Image Movies Image
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Title: string;
      Description: string;
      Image: string;

    }
  ) { }
}
