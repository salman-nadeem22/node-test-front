import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { FilmService, IFilm, IComment } from './../../services/film.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-single-film',
  templateUrl: './single-film.component.html',
  styleUrls: ['./single-film.component.scss'],
})
export class SingleFilmComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private filmService: FilmService,
    public authService: AuthService
  ) {}
  film: IFilm | null = null;
  loading: boolean = false;

  submitComment(form: NgForm, type: string, parent: string | null = null) {
    this.filmService
      .createComment({
        comment: form.form.controls['comment'].value,
        movie: this.film!._id,
        parent,
      })
      .subscribe({
        next: ({ payload }: any) => {
          if (parent) {
            this.film!.comments = this.film?.comments?.map(
              (comment: IComment) => {
                if (comment._id === parent) {
                  return {
                    ...comment,
                    children: comment?.children
                      ? [...comment?.children, payload]
                      : [payload],
                  };
                }
                return comment;
              }
            );
          } else {
            this.film?.comments?.push(payload);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    form.resetForm();
  }

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
