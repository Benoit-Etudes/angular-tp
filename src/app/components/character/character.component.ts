import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CharacterService} from '@/services/character.service';
import {DatePipe, NgClass, NgFor, NgIf, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [
    DatePipe,
    NgOptimizedImage,
    NgIf,
    NgFor,
    NgClass
  ],
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  protected characterService = inject(CharacterService);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params["characterId"]);

    if (!id) {
      this.router.navigateByUrl("erreur/404");
      return;
    }

    this.characterService.fetchCharacterByID(id)
      .subscribe({
        next: (found) => {
          if (!found) {
            console.error(`Personnage avec l'ID ${id} non trouvé`);
          }
        },
        error: (err) => {
          console.error('Erreur lors du chargement du personnage:', err);
        }
      });
  }
  
  goBack(): void {
    this.router.navigateByUrl('characters');
  }
}
