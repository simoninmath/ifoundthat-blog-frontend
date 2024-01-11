import { Component, Input, OnInit } from '@angular/core';
import { NewsletterService } from '../../service/newsletter.service';
import { Newsletter } from 'src/app/model/newsletter';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})

export class NewsletterComponent implements OnInit {
  @Input() newsletter: Newsletter; // Indicate the Component property for each instance : to use app-newsletter component, we need to pass an Object Newsletter first
  newsletters: Newsletter[] = [];
  isAddEmail: boolean;

  // Use dependency injection to access services
  constructor(
    private newsletterService: NewsletterService,
    private http: HttpClient,
    private router: Router
    ) {}

  // The Method below launches the getUserEmailFromNewsletter() method when the program starts
  ngOnInit() {
    this.getUserEmailFromNewsletter();
  }

  getUserEmailFromNewsletter() {
    this.newsletterService.getUserEmailFromNewsletter()
    // The console.log below show hydra:member Array from JSON Object returned by the API
    // console.log(Object.values(response)[4]);
    // This method subscribes to the Observable of newsletter.service.ts 
    .subscribe((response: Newsletter[]) => {
      this.newsletters = response;
    });
  }

    // Refactoring
    onSubmit() {
      if(this.isAddEmail){
        this.newsletterService.addNewsletter(this.newsletter)
        .subscribe((newsletter: Newsletter) => this.router.navigate(['/newsletter', newsletter.id])); // Redirect to the new newsletter id just created
      } else {
        this.newsletterService.updateNewsletter(this.newsletter)
        .subscribe(() => this.router.navigate(['/newsletter', this.newsletter.id]));
      }
    }
    
    // onSubmit() {
    //   this.newsletterService.updateNewsletter(this.newsletter)
    //   .subscribe((newsletter) => { 
    //     if(newsletter) {
    //       this.router.navigate(['/newsletter', this.newsletter.id]);
    //     } else {
    //       //TODO include snackbar with error message
    //     }
    // })
    // }

}