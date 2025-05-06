import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {EpisodeService} from '@/services/episode.service';
import {EpisodeI} from '@/interfaces/episode.interface';
import {EpisodeItemComponent} from '@/components/episode-item/episode-item.component';
import {ResponseInfoI} from '@/interfaces/api/rickandmorty.interface';

@Component({
  selector: 'app-episodes',
  imports: [
    EpisodeItemComponent
  ],
  templateUrl: './episodes.component.html',
  styleUrl: './episodes.component.css'
})
export class EpisodesComponent implements OnInit {
  private episodeService = inject(EpisodeService);

  episodesList: WritableSignal<EpisodeI[]> = this.episodeService.episodesList;
  page: WritableSignal<number> = signal(1);
  infos: WritableSignal<ResponseInfoI> = this.episodeService.infos;

  ngOnInit(): void {
    this.episodesList.set(this.episodeService.getEpisodesList(this.page()));
  }

  onPageChange(page: number): void {
    this.page.set(page);
    this.episodesList.set(this.episodeService.getEpisodesList(this.page()));
  }
}
