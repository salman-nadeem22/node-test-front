import { AuthGuard } from './shared/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CreateFilmComponent } from './film/create-film/create-film.component';
import { FilmListComponent } from './film/film-list/film-list.component';
import { SingleFilmComponent } from './film/single-film/single-film.component';

const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ],
  },
  {
    path: 'films',
    children: [
      {
        path: 'create',
        component: CreateFilmComponent,
        canActivate: [AuthGuard],
      },
      {
        path: ':slug',
        component: SingleFilmComponent,
      },
      {
        path: '',
        component: FilmListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
