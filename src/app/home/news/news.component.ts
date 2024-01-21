// import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})

export class NewsComponent implements OnInit {
  
  imgNewsMain: string;

  // constructor(
  //   private router: Router
  // ){}

  ngOnInit() {
    this.imgNewsMain = 'https://images.unsplash.com/photo-1517857612127-f33b2b246bd6?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  }

  goToReddit() {
    const redditWebSite = 'https://www.reddit.com/';
    window.open(redditWebSite, '_blank', 'noopener,noreferrer');  // Open the link in a new window, and avoid the reference call back to secure the external link
  }

}
