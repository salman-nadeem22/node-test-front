import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  ACCESS_TOKEN = 'ACCESS_TOKEN';
  accessToken: string | null = null;
  errors: any = null;
  loading = false;

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem(this.ACCESS_TOKEN);
    if (token) this.accessToken = token;
  }

  logout() {
    this.accessToken = null;
    localStorage.setItem(this.ACCESS_TOKEN, '');
    window.location.reload();
  }

  login(email: string, password: string) {
    this.loading = true;
    const token: string = btoa(email + ':' + password);
    this.http
      .get(environment.apiUrl + '/auth/login', {
        headers: { Authorization: `basic ${token}` },
      })
      .subscribe({
        next: (response: any) => {
          this.loading = false;
          this.setToken(response['payload']['access'] as string);
          this.router.navigate(['/films']);
        },
        error: (err) => {
          this.loading = false;
          this.errors = err;
        },
      });
  }

  register(data: any) {
    this.loading = true;
    this.http.post(environment.apiUrl + '/auth/register', data).subscribe({
      next: (response: any) => {
        this.loading = false;
        this.setToken(response['payload']['access'] as string);
        this.router.navigate(['/films']);
      },
      error: (err) => {
        this.loading = false;
        this.errors = err;
      },
    });
  }

  private setToken(token: string) {
    localStorage.setItem(this.ACCESS_TOKEN, token);
    this.accessToken = token;
  }
}
