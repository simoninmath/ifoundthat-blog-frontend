import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../card.service';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss'],
})
export class CardDetailComponent implements OnInit {
  cardDetails: any; // Card type

  constructor(
    private route: ActivatedRoute,
    private cardService: CardService // Service get card details from DB with an Http request
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const cardIdString = params.get('id'); // Get card id from db
      if (cardIdString !== null) {
        const cardId = +cardIdString;
        this.cardService.getCardDetails(cardId).subscribe((details) => {
          this.cardDetails = details; // Update card details
        });
      } else {
        //TODO  Gérer le cas où 'id' est null (redirection ou message d'erreur).
      }
    });
  }
}
