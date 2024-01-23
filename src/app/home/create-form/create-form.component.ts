import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { Create } from 'src/app/model/create';
import { ArticleService } from 'src/app/service/article.service';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})

export class CreateFormComponent {

  createForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private articleService: ArticleService,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.initForm();
  }


  private initForm(): void {
    this.createForm = this.formBuilder.group({
      title: ['', Validators.required],
      chapo: ['', Validators.required],
      content: ['', Validators.required],
      categorie: ['/api/categories/1', Validators.required], // Vous pouvez ajuster l'URL de la catégorie selon vos besoins
      user: ['/api/users/1', Validators.required],           // Vous pouvez ajuster l'URL de l'utilisateur selon vos besoins
    });
  }


  goBackHome() {
      this.router.navigate(['/home']);
    }


  // This method call newsletter service to get newsletter user email object
  onSubmitCreateForm() {
    if (this.createForm.valid) {
      const createDataArticle: Create = {
        title: this.createForm.value.title,
        chapo: this.createForm.value.chapo,
        content: this.createForm.value.content,
        categorie: this.createForm.value.categorie,
        user: this.createForm.value.user,
      };
  
      this.articleService.createFormArticle(createDataArticle).pipe(
        tap(() => this.router.navigate(['/home'])),  // Updated navigation
      ).subscribe();
    }
  }

}
