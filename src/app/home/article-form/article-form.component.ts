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
  types: string[]; // All types in the app
  isAddForm: boolean;

  constructor(
    private articleService: ArticleService,
    private router: Router
    ) {}

  ngOnInit() {
    this.types = this.articleService.getArticleCategoryList();
    this.isAddForm = this.router.url.includes('add');
  }

  isTypesValid(type: string): boolean {
    
    if(this.article.category.length == 1 && this.hasType(type)){  // if article has one type on the current card, the checkbox is disable 
      return false;
    }

    if(this.article.category.length > 2 && !this.hasType(type)){ 
      return false;
    }

    return true;
  }

  hasType(type: string) { // Ask is the Type in parameter exist in types table
    return this.article.category.includes(type); // includes() return true or false (native JS)
  }

  selectType($event: Event, type: string) {  // When user click on checkbox, this method verify if the type selected is available
    const isChecked: boolean = ($event.target as HTMLInputElement).checked; // get the DOM event to verify if the box is checked and update @Input, plus cast in HTMLInputElement
  
    if(isChecked) { // add the type checked into Article[]
      this.article.category.push(type)
    } else {
      const index = this.article.category.indexOf(type); // get the index in Article[] to remove the type checked
      this.article.category.splice(index, 1); // modify the selected index with splice() method
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
