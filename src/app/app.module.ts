import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Error404Component } from './error404/error404.component';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { FooterModule } from './footer/footer.module';
import { HomeModule } from './home/home.module';

@NgModule({
  declarations: [
    AppComponent,
    // HomeComponent,
    Error404Component,
  ],
  imports: [
    BrowserModule,
    AuthModule,
    AppRoutingModule,
    HomeModule,
    FooterModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
