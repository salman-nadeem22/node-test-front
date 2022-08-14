import { Component, OnInit } from '@angular/core';
import { capitalize, chunk } from 'lodash';
import { FilmService, IFilm } from 'src/app/services/film.service';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss'],
})
export class FilmListComponent implements OnInit {
  constructor(private filmService: FilmService) {}
  films: Array<IFilm[]> = [];
  currentPage = 1;

  ngOnInit(): void {
    this.filmService.getAllFilms().subscribe({
      next: (data: any) => {
        this.films = this.transformData(data['data']);
      },
    });
  }

  private transformData(data: IFilm[]): Array<IFilm[]> {
    return chunk(
      data.map((film: IFilm) => ({
        ...film,
        name: capitalize(film.name),
        description: capitalize(film.description),
      })),
      10
    );
  }

  handlePrev() {
    if (this.currentPage > 1) this.currentPage = this.currentPage - 1;
  }
  handleNext() {
    if (this.currentPage < this.films.length)
      this.currentPage = this.currentPage + 1;
  }
}
