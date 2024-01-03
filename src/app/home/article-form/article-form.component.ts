import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/model/article';
import { ArticleService } from 'src/app/service/article.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})

export class ArticleFormComponent implements OnInit{
  @Input() article: Article; // Indicate the Component property for each instance : to use app-article component, we need to pass a Object Article first
  categories: string[]; // All categories in the app
  isAddForm: boolean;

  constructor(
    private articleService: ArticleService,
    private router: Router
    ) {}

  ngOnInit() {
    this.categories = this.articleService.getArticleCategoryList();
    this.isAddForm = this.router.url.includes('add');
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

  hasCategory(category: string) { // Ask is the Category in parameter exist in categorys table
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

  // Refactoring
  onSubmit() {
    if(this.isAddForm){
      this.articleService.addArticle(this.article)
      .subscribe((article: Article) => this.router.navigate(['/article', article.id])); // Redirect to the new article id just created
    } else {
      this.articleService.updateArticle(this.article)
      .subscribe(() => this.router.navigate(['/article', this.article.id]));
    }
  }

}
