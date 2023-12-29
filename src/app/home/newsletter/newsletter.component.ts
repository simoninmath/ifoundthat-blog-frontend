import { Component, OnInit } from '@angular/core';
import { NewsletterService } from '../../service/newsletter.service';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})

export class NewsletterComponent implements OnInit {
  subscribers: any[] = [];

  constructor(private newsletterService: NewsletterService) { }

  ngOnInit() {
    this.getSubscribers();
  }

  getSubscribers() {
    this.newsletterService.getSubscribers()
      .subscribe(email => {
        this.subscribers = email; // Assurez-vous que les données correspondent à la structure de votre modèle de données
      });
  }
}
