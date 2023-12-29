import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HeroComponent } from './hero/hero.component';
import { NewsComponent } from './news/news.component';



@NgModule({
  declarations: [
    HomeComponent,
    HeroComponent,
    NewsComponent
  ],
  imports: [
    CommonModule
  ]
})

export class HomeModule { }
