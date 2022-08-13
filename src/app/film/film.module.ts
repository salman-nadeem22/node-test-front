import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmCardComponent } from './film-card/film-card.component';
import { FilmListComponent } from './film-list/film-list.component';
import { SingleFilmComponent } from './single-film/single-film.component';
import { CreateFilmComponent } from './create-film/create-film.component';

@NgModule({
  declarations: [FilmCardComponent, FilmListComponent, SingleFilmComponent, CreateFilmComponent],
  imports: [CommonModule],
  exports: [FilmCardComponent, FilmListComponent, SingleFilmComponent],
})
export class FilmModule {}
