import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EpisodeService} from '@/services/episode.service';
import {DatePipe, NgIf, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-episode',
  standalone: true,
  imports: [
    DatePipe,
    NgOptimizedImage,
    NgIf
  ],
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.css']
})
export class EpisodeComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  protected episodeService = inject(EpisodeService);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params["episodeId"]);

    if (!id) {
      this.router.navigateByUrl("erreur/404");
      return;
    }

    this.episodeService.fetchEpisodeByID(id)
      .subscribe({
        next: (found) => {
          if (!found) {
            console.error(`Épisode avec l'ID ${id} non trouvé`);
          }
        },
        error: (err) => {
          console.error('Erreur lors du chargement de l\'épisode:', err);
        }
      });
  }

  onShowCharacter(characterUrl: string): void {
    const characterId = characterUrl.split('/').slice(-1)[0];
    this.router.navigateByUrl(`characters/${characterId}`);
  }

  goBack(): void {
    this.router.navigateByUrl('episodes');
  }
}
