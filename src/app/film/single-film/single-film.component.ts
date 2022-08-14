import { ActivatedRoute, Router } from '@angular/router';
import { FilmService, IFilm } from './../../services/film.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-film',
  templateUrl: './single-film.component.html',
  styleUrls: ['./single-film.component.scss'],
})
export class SingleFilmComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private filmService: FilmService
  ) {}
  film: IFilm | null = null;
  loading: boolean = false;

  ngOnInit(): void {
    this.loading = true;
    this.filmService
      .getSingleFilms(this.route.snapshot.params['slug'])
      .subscribe({
        next: (data: any) => {
          this.film = data['payload'];
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });
  }
}
