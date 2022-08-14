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

  commentMessage: string = '';
  replyMessage: string = '';

  submitReply(form: NgForm, parent: string) {
    this.filmService
      .createComment({
        parent,
        comment: this.replyMessage,
        movie: this.film!._id,
      })
      .subscribe({
        next: ({ payload }: any) => {
          this.film!.comments = this.film?.comments?.map(
            (comment: IComment) => {
              if (comment._id === parent) {
                return {
                  ...comment,
                  children: [...(comment.children as IComment[]), payload],
                };
              }
              return comment;
            }
          );
        },
        error: (err) => {
          console.log(err);
        },
      });
    form.resetForm();
  }

  submitComment(form: NgForm) {
    this.filmService
      .createComment({
        comment: this.commentMessage,
        movie: this.film!._id,
      })
      .subscribe({
        next: ({ payload }: any) => {
          this.film?.comments?.push(payload);
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
