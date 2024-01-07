import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CardService } from '../card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() cardId: number = 6;  // ID de la carte //TODO dynamiser récupération id depuis la db

  constructor(
    private router: Router,
    private cardService: CardService // Service pour récupérer les détails de la carte
  ) {
    console.log('SERVICE INJECTION TEST!', this.cardService);
  }

  onCardClick() {
    console.log('CLICKED!');
    this.cardService.getIdFromDb(this.cardId).subscribe(() => {     // Récupérer les détails de la carte avec l'ID spécifique
      this.router.navigate(['/articles', this.cardId]);       // Naviguer vers la vue des détails de la carte avec l'ID spécifique
    });
  }
}

