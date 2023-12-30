import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/model/article';
import { ArticleService } from 'src/app/service/article.service';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})

export class EditArticleComponent implements OnInit {

  article: Article | undefined;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private title: Title
  ){}

  // Get the URL and article id, if it's right, return the selected article, else undefined
  ngOnInit() {
    const articleId: string | null = this.route.snapshot.paramMap.get('id');
    if(articleId) {
      this.articleService.getArticleById(+articleId).subscribe(article => {  // Get dynamic titles in edit section
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

}
