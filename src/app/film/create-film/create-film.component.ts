import { FilmService } from 'src/app/services/film.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgSelectConfig } from '@ng-select/ng-select';
import { DatepickerOptions } from 'ng2-datepicker';

@Component({
  selector: 'app-create-film',
  templateUrl: './create-film.component.html',
  styleUrls: ['./create-film.component.scss'],
})
export class CreateFilmComponent implements OnInit {
  constructor(
    private config: NgSelectConfig,
    private filmService: FilmService
  ) {
    this.config.appendTo = 'body';
  }
  error = null;

  film = {
    name: '',
    country: '',
    genre: [],
    photo: '',
    releaseDate: null,
    rating: null,
    price: null,
    description: '',
  };

  genres = [
    { id: 'action', name: 'Action' },
    { id: 'adventure', name: 'Adventure' },
    { id: 'horror', name: 'Horror' },
    { id: 'drama', name: 'Drama' },
    { id: 'comedy', name: 'Comedy' },
    { id: 'sci-fi', name: 'Sci-fi' },
  ];

  datepickerOption: DatepickerOptions = {
    calendarClass: 'datepicker-default',
    format: 'yyyy-MM-dd',
  };

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.filmService.createFilm(this.film).subscribe({
      next: () => {
        form.resetForm();
      },
      error: (err) => {
        this.error = err['error'];
      },
    });
  }

  validateData() {
    return (
      this.film.name &&
      this.film.country &&
      this.film.description &&
      this.film.photo &&
      this.film.price &&
      this.film.rating &&
      this.film.releaseDate &&
      this.film.genre.length
    );
  }
}
