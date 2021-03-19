import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../../models/Movie';
import { MovieDbService } from '../../services/movie-db.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

movies: any;

query = '';
public pageSize = 20;
public currentPage = 1;
totalElements = 0;
// tslint:disable-next-line:variable-name
public total_pages = 500;
// tslint:disable-next-line:variable-name
session_id: any;
@ViewChild(MatPaginator, { static : false}) paginator: MatPaginator| null = null;

  constructor(public movieDBService: MovieDbService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar) {
    // tslint:disable-next-line: deprecation
    this.route.queryParams.subscribe(params => {
      // tslint:disable-next-line:no-string-literal
      this.session_id = params['session_id'];
      console.log('session Id on on movie list: -->', this.session_id);
  });
    this.getMovies();
  }

  ngOnInit(): void {
  }

  navigate(id: string): void {
    this.router.navigate(['/details'], { queryParams: { movieId: id, session_id: this.session_id } });
  }

getMovies(pageEvent?: PageEvent): void {
  if (!!pageEvent) {
    this.pageSize = +pageEvent.pageSize;
    this.currentPage = +pageEvent?.pageIndex + 1;
  }
  // tslint:disable-next-line: deprecation
  this.movieDBService.getMoviesWithPagination(this.currentPage).subscribe(data => {
    this.movies = data;
    console.log('movie pagination list: -->', data);
  });
  }

  searchMovie(): void {
    // tslint:disable-next-line: deprecation
    this.movieDBService.searchMovie(this.query).subscribe(data => {
      this.movies = data;
      console.log('movie search: -->', data);
    });
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
