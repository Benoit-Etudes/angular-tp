import {Component, Input} from '@angular/core';
import {EpisodeI} from '@/interfaces/episode.interface';
import {DatePipe, NgOptimizedImage, UpperCasePipe} from '@angular/common';

@Component({
  selector: 'app-episode-item',
  imports: [
    UpperCasePipe,
    DatePipe,
    NgOptimizedImage
  ],
  templateUrl: './episode-item.component.html',
  styleUrl: './episode-item.component.css'
})
export class EpisodeItemComponent {
  @Input({required: true}) episode!: EpisodeI;

}
