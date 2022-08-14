import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.scss'],
})
export class FilmCardComponent implements OnInit {
  @Input() name: string = '';
  @Input() description: string = '';
  @Input() slug: string = '';
  @Input() image: string = '';
  @Input() price: number | null = null;
  @Input() rating: number | null = null;

  constructor() {}

  ngOnInit(): void {}
}
