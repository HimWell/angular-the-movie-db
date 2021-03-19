import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserToken } from 'src/app/models/UserToken';
import { MovieDbService } from 'src/app/services/movie-db.service';

@Component({
  selector: 'app-generate-token',
  templateUrl: './generate-token.component.html',
  styleUrls: ['./generate-token.component.scss']
})
export class GenerateTokenComponent implements OnInit {

  userToken: UserToken = {};

  constructor(public movieDBService: MovieDbService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  generateToken(): void {
    // tslint:disable-next-line: deprecation
    this.movieDBService.createRequestToken().subscribe(
      res => {
        this.userToken = res;
        console.log('user token: -->:', res);
        this.snackBar.open('Redirecting to The Movie DB', '', {
          duration: 3000,
          horizontalPosition: 'end',
          panelClass: 'background-success'
        });
        window.location.href = `https://www.themoviedb.org/authenticate/${this.userToken.request_token}?redirect_to=http://localhost:4200/login`;
      }),
            // tslint:disable-next-line: no-unused-expression
            () => {
              this.snackBar.open(`Failed to Redirect to Movie DB`, '',
      {
        horizontalPosition: 'end',
        panelClass: 'background-err'
      });
         };
  }

}
