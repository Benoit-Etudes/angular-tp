import {Component, inject, OnInit, WritableSignal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EpisodeService} from '@/services/episode.service';
import {EpisodeI} from '@/interfaces/episode.interface';
import {DatePipe, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-episode',
  imports: [
    DatePipe,
    NgOptimizedImage
  ],
  templateUrl: './episode.component.html',
  styleUrl: './episode.component.css'
})
export class EpisodeComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  protected episodeService = inject(EpisodeService);

  episode: WritableSignal<EpisodeI | null> = this.episodeService.episode;

  ngOnInit(): void{
    let id: number = Number(this.route.snapshot.params["episodeId"]);

    if(!id){
      this.router.navigateByUrl("erreur/404");
    }

    this.episode.set(this.episodeService.getEpisodeByID(id));

    if(!this.episode) {
      this.router.navigateByUrl("episodes");
    }
  }

  onShowCharacter(characterUrl: string): void {
    const characterId = characterUrl.split('/').slice(-1)[0];
    this.router.navigateByUrl(`characters/${characterId}`);
  }
}
