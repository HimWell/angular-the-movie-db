import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieDbService } from 'src/app/services/movie-db.service';
import { User } from '../../models/User';
import { Session } from '../../models/Session';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

user: User = {};
session: Session = {};
tokenParam: any;

  constructor(public movieDBService: MovieDbService, private snackBar: MatSnackBar, public router: Router, private route: ActivatedRoute) {
   }

  ngOnInit(): void {
    // tslint:disable-next-line: deprecation
    this.route.queryParams.subscribe(params => {
        // tslint:disable-next-line:no-string-literal
        this.tokenParam = params['request_token'];
        console.log('token parameter: -->', this.tokenParam);
    });
  }

  loginUser(): void {
    if (this.user.username === 'voss-solutions' && this.user.password === 'supersecretpassword') {
      this.user.request_token = this.tokenParam;
      this.session.request_token = this.tokenParam;
      // tslint:disable-next-line: deprecation
      this.movieDBService.createSession(this.session).subscribe(
        res => {
          this.session = res;
          console.log('session results: -->', res);
          // console.log('session Id: -->', this.session.session_id);
          this.router.navigate(['/list'], {queryParams: { session_id: this.session.session_id }});
        });
      // tslint:disable-next-line: deprecation
      this.movieDBService.createSessionWithLogin(this.user).subscribe(
                data => {
                  this.user = data;
                  console.log('user details: -->', data);
                  this.snackBar.open('User Logged in Successfully', '', {
                    duration: 3000,
                    horizontalPosition: 'end',
                    panelClass: 'background-success'
                  });
                }
              );
    } else {
  this.snackBar.open(`Failed to Login...Try Again`, '', {
          horizontalPosition: 'end',
          panelClass: 'background-err'
      });
    }
  }
}
