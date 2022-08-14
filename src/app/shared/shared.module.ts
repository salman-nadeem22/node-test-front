import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [HeaderComponent, LoaderComponent],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent, LoaderComponent],
})
export class SharedModule {}
