import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CardService } from '../card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() cardId: number = 1;  // ID de la carte

  constructor(
    private router: Router,
    private cardService: CardService // Service pour récupérer les détails de la carte
  ) {console.log('SERVICE INJECTION TEST!', this.cardService)}

  onCardClick() {
    console.log('CLICKED!');
    // Récupérer les détails de la carte avec l'ID spécifique
    this.cardService.getCardDetails(this.cardId).subscribe(() => {

      // Naviguer vers la vue des détails de la carte avec l'ID spécifique
      this.router.navigate(['/articles', this.cardId]);
    });
  }
}

