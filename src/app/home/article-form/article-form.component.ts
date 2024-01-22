import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { Article } from 'src/app/model/article';
import { ArticleService } from 'src/app/service/article.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})

export class ArticleFormComponent implements OnInit{

  @Input() article: Article; // Indicate the Component property for each instance to use app-article component, we need to pass a Object Article first
  categories: string[] = [  // All categories in the app
    'Category 1', 
    'Category 2', 
    'Category 3', 
    'Category 4', 
    'Category 5']; 
  // isAddForm: boolean;
  articleForm: FormGroup;

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private formBuilder: FormBuilder
    ) {
      this.articleForm = this.formBuilder.group({
        title: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9àéèç]{1,255}$')]],
        chapo: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9àéèç]{1,255}$')]],
        content: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9àéèç]{1,3500}$')]],
        category: ['', Validators.required]
      });
    }

  ngOnInit() {
    this.categories = this.articleService.getArticleCategoryList();
    // this.isAddForm = this.router.url.includes('add');
  }

  
  isCategoryValid(category: string): boolean {
    
    if(this.article.categories.length == 1 && this.hasCategory(category)){  // if article has one category on the current card, the checkbox is disable 
      return false;
    }

    if(this.article.categories.length > 2 && !this.hasCategory(category)){ 
      return false;
    }

    return true;
  }


  hasCategory(category: string) { // Ask is the category in parameter exist in categories table
    return this.article.categories.includes(category); // includes() return true or false (native JS)
  }


  selectCategory($event: Event, category: string) {  // When user click on checkbox, this method verify if the category selected is available
    const isChecked: boolean = ($event.target as HTMLInputElement).checked; // get the DOM event to verify if the box is checked and update @Input, plus cast in HTMLInputElement
  
    if(isChecked) { // add the category checked into Article[]
      this.article.categories.push(category)
    } else {
      const index = this.article.categories.indexOf(category); // get the index in Article[] to remove the category checked
      this.article.categories.splice(index, 1); // modify the selected index with splice() method
    }
  }

  goBackHome() {
    this.router.navigate(['/home']);
  }

  onSubmitEdit() {
      console.log('SUBMIT BUTTON FROM EDIT');
      this.articleService.putArticle(this.article).pipe(
          tap(() => this.router.navigate(['/articles', this.article.id])),
        ).subscribe();
    }

}
