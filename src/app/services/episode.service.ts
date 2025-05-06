import {inject, Injectable, signal, WritableSignal} from "@angular/core";
import {EpisodeI} from '@/interfaces/episode.interface';
import {RickandmortyService} from '@/services/api/rickandmorty/rickandmorty.service';
import {mergeMap, switchMap} from 'rxjs/operators';
import {RickMortyApiResponseI} from '@/interfaces/api/rickandmorty.interface';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class EpisodeService {
  private rickAndMortyService: RickandmortyService = inject(RickandmortyService);

  episodesList: WritableSignal<EpisodeI[]> = signal([]);

  getEpisodesList(): EpisodeI[] {
    const apiData: Observable<RickMortyApiResponseI> = this.rickAndMortyService.getEpisodesList();
    apiData.pipe(
      mergeMap((response: RickMortyApiResponseI) => {
        if (response) {
          this.episodesList.set(response.results);
          return response.results;
        } else {
          throw new Error("Impossible de récupérer les épisodes");
        }
      })
    ).subscribe();
    console.log("Episode list:", this.episodesList);
    return this.episodesList();
  }

  getEpisodeByID(episodeId: number): EpisodeI|undefined{
    return this.rickAndMortyService.getEpisodeByID(episodeId);
  }
}
