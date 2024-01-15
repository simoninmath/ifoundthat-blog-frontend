import { Component } from '@angular/core';
import { FormService } from '../../service/form.service';
import { FormModel } from 'src/app/model/form';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl:'./form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent {
  formModel: FormModel = { name: '', email: '', message: '' };
  submitted = false;

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [Validators.required]),
  }, {});

  constructor(
    private formService: FormService, 
    ) {}
  
    onSubmit() {
      this.form.markAllAsTouched();
      if (!this.form.valid) return;
      this.formService.submitForm(this.formModel).subscribe(() => {  // Send form to Service
      this.submitted = true;
    });

    }
}
