import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../card.service';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss']
})
export class CardDetailComponent implements OnInit {
  cardDetails: any; // Type spécifique à votre carte

  constructor(
    private route: ActivatedRoute,
    private cardService: CardService // Service pour récupérer les détails de la carte
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const cardIdString = params.get('id'); // Récupérer l'ID de la carte depuis l'URL  //TODO récupérer dynamiquement l'id depuis la db
      if (cardIdString !== null) {
        const cardId = +cardIdString;
        this.cardService.getIdFromDb(cardId).subscribe((details) => {
          this.cardDetails = details; // Mettre à jour les détails de la carte
        });
      } else {
        // Gérer le cas où 'id' est null, peut-être rediriger ou afficher un message d'erreur.
      }
    });
  }
}
