import { Component, OnInit } from '@angular/core';
import { DatepickerOptions } from 'ng2-datepicker';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(public authService: AuthService) {}

  datepickerOption: DatepickerOptions = {
    calendarClass: 'datepicker-default',
    format: 'yyyy-MM-dd',
  };

  registerData = {
    email: '',
    password: '',
    dateOfBirth: null,
    username: '',
  };

  ngOnInit(): void {}

  onSubmit() {
    this.authService.register(this.registerData);
  }
}
