import { Component, OnInit } from '@angular/core';
import { NgSelectConfig } from '@ng-select/ng-select';
import { DatepickerOptions } from 'ng2-datepicker';

@Component({
  selector: 'app-create-film',
  templateUrl: './create-film.component.html',
  styleUrls: ['./create-film.component.scss'],
})
export class CreateFilmComponent implements OnInit {
  constructor(private config: NgSelectConfig) {
    this.config.appendTo = 'body';
  }

  film = {
    name: '',
    country: '',
    selectedGenre: [],
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
}
