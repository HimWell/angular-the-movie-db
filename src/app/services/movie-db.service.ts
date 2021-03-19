import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Movie } from '../models/Movie';
import { MovieDetails } from '../models/MovieDetails';
import { Rating } from 'src/app/models/Rating';
import { UserToken } from '../models/UserToken';
import { User } from '../models/User';
import { Session } from '../models/Session';

@Injectable({
  providedIn: 'root'
})

export class MovieDbService {
  private apiKey = 'b7eafb09051745b02a395524ea015c2e';
  private url = 'https://api.themoviedb.org/3';

  constructor(private httpClient: HttpClient) { }

  createRequestToken(): Observable<UserToken> {
    return this.httpClient.get<UserToken>(`${this.url}/authentication/token/new?api_key=${this.apiKey}`).pipe(
      catchError(err => throwError(err))
    );
  }

  createSession(formValues: Session): Observable<Session> {
    return this.httpClient.post<Session>(`${this.url}/authentication/session/new?api_key=${this.apiKey}`, formValues).pipe(
      catchError(err => throwError(err))
    );
  }

  createSessionWithLogin(formValues: User): Observable<User> {
    return this.httpClient.post<User>(`${this.url}/authentication/token/validate_with_login?api_key=${this.apiKey}`, formValues).pipe(
      catchError(err => throwError(err))
    );
  }

  // extra delete a session
  // tslint:disable-next-line:variable-name
  // deleteSession(session_id: string): Observable<Session> {
  //   return this.httpClient.delete<Session>(`${this.url}/authentication/session?api_key=${this.apiKey}` + session_id).pipe(
  //     catchError(err => throwError(err))
  //   );
  // }

  getMoviesWithPagination(page: number): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(`${this.url}/movie/popular?api_key=${this.apiKey}&language=en-US&page=${page}`).pipe(
      catchError(err => throwError(err))
    );
  }

  getMovieDetailsByID(id: string): Observable<MovieDetails> {
    return this.httpClient.get<MovieDetails>(`${this.url}/movie/${id}?api_key=${this.apiKey}`).pipe(
      catchError(err => throwError(err))
    );
  }

  searchMovie(searchQuery: string): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(`${this.url}/search/movie?api_key=${this.apiKey}&language=en-US&query=${searchQuery}`).pipe(
      catchError(err => throwError(err))
    );
  }

  // tslint:disable-next-line:variable-name
  rateMovie(id: string, session_id: string, formValues: Rating): Observable<Rating> {
    let header = new HttpHeaders();
    header = header.set('content-type', 'application/json;charset=utf-8');
    return this.httpClient.post<Rating>(`${this.url}/movie/${id}/rating?api_key=${this.apiKey}&session_id=${session_id}`, formValues, {
      headers: header
    }).pipe(
      catchError(err => throwError(err))
    );
  }
}
