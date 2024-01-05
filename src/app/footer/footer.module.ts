import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { CookiesComponent } from './cookies/cookies.component';
import { LegalComponent } from './legal/legal.component';
import { PolicyComponent } from './policy/policy.component';
import { TermsComponent } from './terms/terms.component';


@NgModule({
  declarations: [
    FooterComponent,
    CookiesComponent,
    LegalComponent,
    PolicyComponent,
    TermsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FooterComponent,
  ]
})
export class FooterModule { }
