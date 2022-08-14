import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { DatepickerModule } from 'ng2-datepicker';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [CommonModule, FormsModule, DatepickerModule],
  exports: [LoginComponent, RegisterComponent],
})
export class AuthModule {}
