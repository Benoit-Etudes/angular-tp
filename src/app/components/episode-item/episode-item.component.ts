import {Component, inject, Input} from '@angular/core';
import {EpisodeI} from '@/interfaces/episode.interface';
import {DatePipe, NgOptimizedImage, UpperCasePipe} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-episode-item',
  imports: [
    DatePipe,
    NgOptimizedImage
  ],
  templateUrl: './episode-item.component.html',
  styleUrl: './episode-item.component.css'
})
export class EpisodeItemComponent {
  private router = inject(Router);
  @Input({required: true}) episode!: EpisodeI;

  onShowEpisode(id: number): void{
    this.router.navigateByUrl(`episodes/${id}`);
  }

  onShowCharacter(characterUrl: string): void {
    const characterId = characterUrl.split('/').slice(-1)[0];
    this.router.navigateByUrl(`characters/${characterId}`);
  }
}
