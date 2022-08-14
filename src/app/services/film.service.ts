import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

export interface IAudit {
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}

export interface IComment {
  _id: string;
  parent: string;
  name: string;
  movie: string;
  comment: string;
  children?: IComment[];
  audit: IAudit;
}

export interface IFilm {
  name: string;
  slug: string;
  description: string;
  country: string;
  genre: string[];
  photo: string;
  releaseDate: Date;
  rating: number;
  comments?: IComment[];
  price: number;
}

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllFilms() {
    return this.http.get(environment.apiUrl + '/movie');
  }

  getSingleFilms(slug: string) {
    return this.http.get(`${environment.apiUrl}/movie/${slug}`);
  }

  createFilm(data: string) {
    return this.http.post(environment.apiUrl + '/movie/create', data, {
      headers: { Authorization: 'bearer ' + this.authService.accessToken },
    });
  }
}
