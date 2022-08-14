import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  ACCESS_TOKEN = 'ACCESS_TOKEN';
  USER_DETAILS = 'USER_DETAILS';
  accessToken: string | null = null;
  user: any = null;
  errors: any = null;
  loading = false;

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem(this.ACCESS_TOKEN);
    const user = localStorage.getItem(this.USER_DETAILS);
    if (token) this.accessToken = token;
    if (user) this.user = JSON.parse(user);
  }

  logout() {
    this.accessToken = null;
    localStorage.clear();
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
          this.setUser(response['payload']['access'] as string);
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
        this.setUser(response['payload']['access'] as string);
        this.router.navigate(['/films']);
      },
      error: (err) => {
        this.loading = false;
        this.errors = err;
      },
    });
  }

  getUser() {
    return this.http.get(environment.apiUrl + '/user/get-me', {
      headers: {
        Authorization: 'bearer ' + this.accessToken,
      },
    });
  }

  private setUser(token: string) {
    localStorage.setItem(this.ACCESS_TOKEN, token);
    this.accessToken = token;
    this.getUser().subscribe({
      next: ({ payload }: any) => {
        this.user = payload;
        localStorage.setItem(this.USER_DETAILS, JSON.stringify(payload));
      },
    });
  }
}
