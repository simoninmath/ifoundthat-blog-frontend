import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/model/article';
import { ArticleService } from 'src/app/service/article.service';

@Component({
  selector: 'app-detail-article',
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.scss']
})

export class DetailArticleComponent {
  articleList: Article[];
  article: Article | undefined;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,  // Dependence Injection allow the Route Service disable into the Component
    private articleService: ArticleService,  // DI for articleService
    private title: Title  // DI for dynamic titles
    ) {}  

  // Refactoring
  ngOnInit() {
    const articleId: string | null = this.route.snapshot.paramMap.get("id");
    if(articleId) {
      this.articleService.getArticleById(+articleId).subscribe(article => {  // Get dynamic titles in detail section
        this.article = article;
        this.initTitle(article);
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

  deleteArticle(article: Article){
    this.articleService.deleteArticleById(article.id)
    .subscribe(() => this.goToArticleList());
  }

  goToArticleList() {
    this.router.navigate(['/articles']);
  }

  goToEditArticle(article: Article){
     this.router.navigate(['edit/articles', article.id]);
  }

}
