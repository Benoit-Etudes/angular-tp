import { Injectable } from "@angular/core";
import {EpisodeI} from '@/interfaces/episode.interface';

@Injectable({
  providedIn: "root"
})
export class EpisodeService {
  episodes: EpisodeI[] = [];

  getEpisodeList(): EpisodeI[] {
    return this.episodes;
  }

  getEpisodeByID(episodeId: number): EpisodeI|undefined{
    const episode = this.episodes.find(episode => episode.id === episodeId);
    if(!episode) return undefined;
    return episode;
  }

}
