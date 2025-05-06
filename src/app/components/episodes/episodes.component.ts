import {Component, inject, OnInit} from '@angular/core';
import {EpisodeService} from '@/services/episode.service';
import {EpisodeItemComponent} from '@/components/episode-item/episode-item.component';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-episodes',
  standalone: true,
  imports: [
    EpisodeItemComponent,
    NgIf,
    NgClass
  ],
  templateUrl: './episodes.component.html',
  styleUrl: './episodes.component.css'
})
export class EpisodesComponent implements OnInit {
  protected episodeService = inject(EpisodeService);

  ngOnInit(): void {
    this.episodeService.fetchEpisodesList(1);
  }
}
