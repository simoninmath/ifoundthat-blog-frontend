import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContactForm } from 'src/app/model/contact-form';
import { FormService } from 'src/app/service/form.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {

  contactForm: FormGroup;
  private contactFormSubscription: Subscription;

  constructor(
    private formService: FormService, 
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.contactForm = this.formBuilder.group({
      name: ['',[Validators.required, Validators.pattern('^[a-zA-Z0-9àéèç]{1,255}$')],],
      email: ['', [Validators.required, Validators.email]],
      message: ['',[Validators.required, Validators.maxLength(255), Validators.pattern(
              '^[a-zA-Z0-9èâàç;,!?:\'ÉÈÊÀÇËÏÎÔÙÛÜéèêàçëïîôùûü\\s]+$'
          ),
        ],
      ],
    });
  }

  submitContactForm() {
    if (this.contactForm.valid) {
      console.log('FORM CREATE CONTENT', this.contactForm);
      const createDataForm: ContactForm = {
               name: this.contactForm.value.name,
               email: this.contactForm.value.email,
               message: this.contactForm.value.message,
            };

      this.contactFormSubscription = this.formService  // Stock the subscription
        .createContactForm(createDataForm)
        .subscribe(() => {
          console.log('CATCH ARTICLE DATA FROM SUBMIT', createDataForm);
          this.router.navigate(['/home']);
        });
    }
  }

  // this method unsubscribe explicitally to the Observable when the component is destroy (life cycle hooks)
  // ngOnDestroy() {
  //   console.log('UNSUBSCRIB FROM CONTACT FORM');
  //   if (this.contactFormSubscription) {
  //     this.contactFormSubscription.unsubscribe();
  //   }
  // }

}
