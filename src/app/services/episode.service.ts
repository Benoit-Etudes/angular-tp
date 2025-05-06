import {inject, Injectable, signal, WritableSignal} from "@angular/core";
import {EpisodeI} from '@/interfaces/episode.interface';
import {RickandmortyService} from '@/services/api/rickandmorty/rickandmorty.service';
import {mergeMap} from 'rxjs/operators';
import {RickMortyApiEpisodeResponseI} from '@/interfaces/api/rickandmorty.interface';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class EpisodeService {
  private rickAndMortyService: RickandmortyService = inject(RickandmortyService);

  episodesList: WritableSignal<EpisodeI[]> = signal([]);
  episode: WritableSignal<EpisodeI | null> = signal(null);

  getEpisodesList(): EpisodeI[] {
    const apiData: Observable<RickMortyApiEpisodeResponseI> = this.rickAndMortyService.getEpisodesList();
    apiData.pipe(
      mergeMap((response: RickMortyApiEpisodeResponseI) => {
        if (response) {
          this.episodesList.set(response.results);
          this.episode.set(null); // Reset the episode when fetching the list
          return response.results;
        } else {
          throw new Error("Impossible de récupérer les épisodes");
        }
      })
    ).subscribe();
    console.log("Episode list:", this.episodesList);
    return this.episodesList();
  }

  getEpisodeByID(episodeId: number): EpisodeI | null {
    console.log("Episode ID:", episodeId);
    const apiData: Observable<EpisodeI> = this.rickAndMortyService.getEpisodeByID(episodeId);
    apiData.pipe(
      mergeMap((response: any) => {
        if (response) {
          this.episode.set(response);
          return response;
        } else {
          throw new Error("Impossible de récupérer les épisodes");
        }
      })
    ).subscribe();
    console.log("Episode list:", this.episodesList);
    return this.episode();
  }
}
