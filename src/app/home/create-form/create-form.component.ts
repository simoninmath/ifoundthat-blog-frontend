import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private articleService: ArticleService
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

  onSubmit(): void {
    if (this. createForm.valid) {
      const createDataArticle: Create = this. createForm.value;

      // Appelez votre service pour envoyer l'article au serveur
      this.articleService.createFormArticles(createDataArticle).subscribe(
        (response) => {
          console.log('Article créé avec succès !', response);
          // Ajoutez ici toute logique de redirection ou de traitement supplémentaire
        },
        (error) => {
          console.error('Erreur lors de la création de l\'article :', error);
        }
      );
    }
  }

}
