import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Article } from 'src/app/model/article';
import { Category } from 'src/app/model/category';
import { ArticleService } from 'src/app/service/article.service';

@Component({
  selector: 'app-detail-article',
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.scss']
})

export class DetailArticleComponent {
  articleList: Article[];
  article: Article | undefined;
  articleCategory: Category[];

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute, 
    private router: Router,  // Dependence Injection allow the Route Service disable into the Component
    private articleService: ArticleService,  // DI for articleService
    private title: Title  // DI for dynamic titles
    ){
      this.articleList = [];
      this.articleCategory = [];
    }  

  ngOnInit() {
    const articleId: string | null = this.route.snapshot.paramMap.get('id');  // Get Card id from URL
    console.log('TEST ARTICLE ID', articleId);
    if(articleId) {
      this.articleService.getArticleByIdFromDb(+articleId).subscribe(article => {  
        this.article = article;
        this.initTitle(article);  // Set dynamic titles in detail article Component
  });
 }
}

  initTitle(article: Article | undefined){
    if(!article){
      this.title.setTitle('This article doesn\'t exist...');
      return;
    }
    this.title.setTitle(article.title);
  }

  // This method redirect to delete method in ArticleService that contains CRUD
  deleteArticle(article: Article){
    this.articleService.deleteArticleById(article.id)
    .subscribe(() => this.goToArticleList());
  }


  goToAddArticle(article: Article){
     this.router.navigate(['add/articles', article]);  // Go to add article form
  }


  goToEditArticle(article: Article){
    this.router.navigate(['edit/articles', article.id]);  // Go to edit article form
 }


  goToArticleList() {  
    this.router.navigate(['/home']);  // Go back to home
  }


  isAdmin(){
    return this.authService.isAdmin();
  }

}
