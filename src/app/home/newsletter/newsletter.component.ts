import { Component, OnInit } from '@angular/core';
import { NewsletterService } from '../../service/newsletter.service';
import { Newsletter } from 'src/app/model/newsletter';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})

export class NewsletterComponent implements OnInit {

  newsletters: Newsletter[] = [];  // Need an iterable for get collection method
  newslettersModel: Newsletter;  // Need a data model for post method
  newslettersForm: FormGroup; // Need form group class to form secured

  // Use dependency injection to access services
  constructor(
    private newsletterService: NewsletterService,
    private router: Router,
    private formBuilder: FormBuilder
    ) {}
  
    // Initialize validators for each field
    private initForm() {
      this.newslettersForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        createdAt: ['', Validators.required],
      });
    }


  // The method below launches methods when the program starts
  ngOnInit() {
    // this.getUserEmailFromNewsletter();
    this.initForm();
  }


  // This method call newsletter service to get newsletter user email
  getUserEmailFromNewsletter() {
    this.newsletterService.getUserEmailFromNewsletter()
    .subscribe((response: Newsletter[]) => {  // This method subscribes to the Observable of newsletter.service.ts
      this.newsletters = response;   
    });
  }


  onSubmitNewsletters() {
    console.log('SUBMIT BUTTON FROM NEWSLETTER !!!');
    this.newsletterService.createFormNewsletter(this.newslettersModel).pipe(
        tap(() => this.router.navigate(['/home', this.newslettersModel])),
      ).subscribe();
  }

  // onSubmitNewsletters() {
  //   if (this.newslettersForm.valid) {
  //     const createDataNewsletter: Newsletter = this.newslettersForm.value;
  //     this.newsletterService.createFormNewsletter(createDataNewsletter)
  //       .subscribe({
  //         next: (response) => {
  //           console.log('Success!', response);
  //         },
  //         error: (error) => {
  //           console.error('Something went wrong...', error);
  //         }
  //       });
  //   }
  // }
  

    // onSubmitNewsletters() {
    //   if (this.newslettersForm.valid) {
    //     const createDataNewsletter: Newsletter = this.newslettersForm.value;
    //     this.newsletterService.createFormNewsletter(createDataNewsletter).subscribe(
    //       (response) => {
    //         console.log('Success!', response);
    //       },
    //       (error) => {
    //         console.error('Something went wrong...', error);
    //       }
    //     );
    //   }
    // }
}