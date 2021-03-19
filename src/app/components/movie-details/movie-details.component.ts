import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MovieDetails } from 'src/app/models/MovieDetails';
import { Rating } from 'src/app/models/Rating';
import { MovieDbService } from 'src/app/services/movie-db.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  selectedMovie$ = new Observable<MovieDetails>();
  rate: Rating = {value: ''};
  // tslint:disable-next-line:variable-name
  session_id: any;
  id: any;

  // tslint:disable-next-line:max-line-length
  constructor(public movieDBService: MovieDbService, private snackBar: MatSnackBar, private route: ActivatedRoute, public router: Router) {

    // tslint:disable-next-line: deprecation
    this.route.queryParams.subscribe(params => {
      // tslint:disable-next-line:no-string-literal
      this.session_id = params['session_id'];
      console.log('session Id on on movie list: -->', this.session_id);
  });

    // tslint:disable-next-line: deprecation
    this.route.queryParams.subscribe(params => {
    // tslint:disable-next-line:no-string-literal
    this.id = params['movieId'];
    console.log('movie Id: -->', this.id);
});

    this.selectedMovie$ = this.route.queryParams.pipe(
      // tslint:disable-next-line:no-string-literal
      map(queryParams => queryParams['movieId']),
      switchMap(id => this.movieDBService.getMovieDetailsByID(id))
      );
    this.snackBar.open(`Retrived Movie Details Successfully`, '', {
        duration: 3000,
        horizontalPosition: 'end',
        panelClass: 'background-success'
      }),
      // tslint:disable-next-line:no-unused-expression
      () => {
           this.snackBar.open(`Failed to Retrive Movie Details`, '',
   {
     horizontalPosition: 'end',
     panelClass: 'background-err'
   });
      };
   }

  ngOnInit(): void {
  }

  rateMovie(id: string): void {
    // tslint:disable-next-line: deprecation
    this.movieDBService.rateMovie(this.id, this.session_id, this.rate).subscribe(
      (res) => {
        console.log('res: -->:', res);
        this.snackBar.open('Your Rating has Sucessfully been Added to the MovieDB', '', {
          duration: 3000,
          horizontalPosition: 'end',
          panelClass: 'background-success'
        });
        this.rate = {value: ''};
      },
      (err) => {
        console.log('err: -->', err);
        this.snackBar.open(`Your Rating has Failed to be Added to the MovieDB`, 'Close', {
          horizontalPosition: 'end',
          panelClass: 'background-err'
      });
    });
  }

  navigateToList(): void {
    this.router.navigate(['/list'], { queryParams: { session_id: this.session_id } });
  }

    // logout(): void {
       // tslint:disable-next-line: deprecation
  //   this.movieDBService.deleteSession(this.session_id).subscribe(
  //     res => {
  //       console.log('deleted session: -->', res);
  //       this.snackBar.open('Logged out Successfully', '', {
  //         duration: 3000,
  //         horizontalPosition: 'end',
  //         panelClass: 'background-success'
  //       });
  //       this.router.navigate(['/token']);
  //     }),
  //     // tslint:disable-next-line: no-unused-expression
  //     () => {
  //          this.snackBar.open(`Failed to Logout User`, '',
  //  {
  //    horizontalPosition: 'end',
  //    panelClass: 'background-err'
  //  });
  //     };
  // }
}
