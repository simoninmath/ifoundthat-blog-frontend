import { Component, OnInit } from '@angular/core';
import { NewsletterService } from '../../service/newsletter.service';
import { Newsletter } from 'src/app/model/newsletter';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})

export class NewsletterComponent implements OnInit {
  newsletters: Newsletter[] = [];

  constructor(
    private newsletterService: NewsletterService,
    private http: HttpClient,
    ) { }

  // The method below launches the getUserEmailFromNewsletter() method when the program starts
  ngOnInit() {
    this.getUserEmailFromNewsletter();
  }

  getUserEmailFromNewsletter() {
    this.newsletterService.getUserEmailFromNewsletter()
    // console.log(Object.values(response)[4]); <- This line show hydra:member Array from JSON Object returned by the API
    .subscribe((response: Newsletter[]) => {
      this.newsletters = response;
    });
  }
}