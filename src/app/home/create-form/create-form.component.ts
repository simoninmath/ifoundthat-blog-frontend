import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Create } from 'src/app/model/create';
import { ArticleService } from 'src/app/service/article.service';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss'],
})
export class CreateFormComponent {
  createForm: FormGroup;
  private createFormSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private articleService: ArticleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    console.log('NGONINIT', this.createFormSubscription);
  }

  private initForm(): void {
    this.createForm = this.formBuilder.group({
      title: ['', Validators.required],
      chapo: ['', Validators.required],
      content: ['', Validators.required],
      categorie: ['/api/categories/1', Validators.required], // Vous pouvez ajuster l'URL de la catégorie selon vos besoins
      user: ['/api/users/1', Validators.required], // Vous pouvez ajuster l'URL de l'utilisateur selon vos besoins
    });
  }

  goBackHome() {
    this.router.navigate(['/home']);
  }

  // This method call newsletter service to get newsletter user email object

  // onSubmitCreateForm() {
  //   if (this.createForm.valid) {
  //     console.log('FORM CREATE CONTENT', this.createForm);
  //     const createDataArticle: Create = {
  //       title: this.createForm.value.title,
  //       chapo: this.createForm.value.chapo,
  //       content: this.createForm.value.content,
  //       categorie: this.createForm.value.categorie,
  //       user: this.createForm.value.user,
  //     };

  //     this.articleService.createFormArticle(createDataArticle).pipe(
  //       catchError(error => {
  //         console.error('Error creating article:', error);
  //         // Vous pouvez ajouter ici des opérations en cas d'erreur si nécessaire
  //         throw error; // Propagez l'erreur pour que le subscribe puisse également la gérer
  //       }),
  //       finalize(() => {
  //         console.log('CATCH ARTICLE DATA FROM SUBMIT', createDataArticle);
  //         // Opérations à effectuer après l'achèvement de l'observable, que ce soit avec succès ou en cas d'erreur
  //         this.router.navigate(['/home']); // Updated navigation
  //       })
  //     );
  //   }
  // }

  // onSubmitCreateForm() {
  //   if (this.createForm.valid) {
  //     console.log('FORM CREATE CONTENT', this.createForm);
  //     const createDataArticle: Create = {
  //       title: this.createForm.value.title,
  //       chapo: this.createForm.value.chapo,
  //       content: this.createForm.value.content,
  //       categorie: this.createForm.value.categorie,
  //       user: this.createForm.value.user,
  //     };

  //     const postArticleObservable = this.articleService.createFormArticle(createDataArticle);

  //     postArticleObservable.subscribe(
  //       (article) => {
  //         console.log('CATCH ARTICLE DATA FROM SUBMIT', article);
  //         this.router.navigate(['/home']);
  //       },
  //       (error) => {
  //         console.error('Error submitting article:', error);
  //       },
  //       () => {
  //         console.log('Article submitted successfully');
  //       }
  //     );
  //   }
  // }

  //   onSubmitCreateForm() {
  //   if (this.createForm.valid) {
  //     console.log('FORM CREATE CONTENT', this.createForm);
  //     const createDataArticle: Create = {
  //       title: this.createForm.value.title,
  //       chapo: this.createForm.value.chapo,
  //       content: this.createForm.value.content,
  //       categorie: this.createForm.value.categorie,
  //       user: this.createForm.value.user,
  //     };

  //     this.articleService.createFormArticle(createDataArticle).pipe(
  //       tap(() => console.log('CATCH ARTICLE DATA FROM SUBMIT', createDataArticle)),  // Updated navigation
  //     ).subscribe(() => this.router.navigate(['/home']));
  //   }
  // }

  onSubmitCreateForm() {
    console.log('TEST ONSUBMITCREATE');
    if (this.createForm.valid) {
      console.log('FORM CREATE CONTENT', this.createForm);
      const createDataArticle: Create = {
        title: this.createForm.value.title,
        chapo: this.createForm.value.chapo,
        content: this.createForm.value.content,
        categorie: this.createForm.value.categorie,
        user: this.createForm.value.user,
      };

      // this.createFormSubscription =
      this.articleService // Stock the subscription
        .createFormArticle(createDataArticle)
        .subscribe(() => {
          console.log('CATCH ARTICLE DATA FROM SUBMIT', createDataArticle);
          this.router.navigate(['/home']);
        });
    }
  }

  // this method unsubscribe explicitally to the Observable when the component is destroy (life cycle hooks)
  ngOnDestroy() {
    console.log('UNSUBSCRIB FROM CREATE FORM');
    // if (this.createFormSubscription) {
    //   this.createFormSubscription.unsubscribe();
    // }
  }
}
