import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmCardComponent } from './film-card/film-card.component';
import { FilmListComponent } from './film-list/film-list.component';
import { SingleFilmComponent } from './single-film/single-film.component';



@NgModule({
  declarations: [
    FilmCardComponent,
    FilmListComponent,
    SingleFilmComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FilmModule { }
