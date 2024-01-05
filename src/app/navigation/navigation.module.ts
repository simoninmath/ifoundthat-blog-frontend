import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    NavbarComponent,
    SearchbarComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  // Exports allow to Components to be used in others Modules
  exports:[
    NavbarComponent,
    SearchbarComponent
  ]
})

export class NavigationModule { }
