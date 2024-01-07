import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Error404Component } from './error404/error404.component';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { FooterModule } from './footer/footer.module';
import { HomeModule } from './home/home.module';
import { NavigationModule } from './navigation/navigation.module';
import { CardComponent } from './home/card/card.component';
import { CardDetailComponent } from './home/card-detail/card-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    Error404Component,
    CardComponent,
    CardDetailComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    AppRoutingModule,
    HomeModule,
    NavigationModule,
    FooterModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
