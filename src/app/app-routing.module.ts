import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { LoginComponent } from './components/login/login.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { GenerateTokenComponent } from './components/generate-token/generate-token.component';

const routes: Routes = [
  { path: '', redirectTo: 'approve', pathMatch: 'full' },
  { path: 'approve', component: GenerateTokenComponent },
  { path: 'login', component: LoginComponent },
  { path: 'list', component: MovieListComponent },
  { path: 'details', component: MovieDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
