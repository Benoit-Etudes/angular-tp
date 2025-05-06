import {inject, Injectable, signal, WritableSignal} from "@angular/core";
import {EpisodeI} from '@/interfaces/episode.interface';
import {RickandmortyService} from '@/services/api/rickandmorty/rickandmorty.service';
import {mergeMap} from 'rxjs/operators';
import {RickMortyApiCharacterResponseI, RickMortyApiEpisodeResponseI} from '@/interfaces/api/rickandmorty.interface';
import {Observable} from 'rxjs';
import {CharacterI} from '@/interfaces/character.interface';

@Injectable({
  providedIn: "root"
})
export class CharacterService {
  private rickAndMortyService: RickandmortyService = inject(RickandmortyService);

  charactersList: WritableSignal<CharacterI[]> = signal([]);
  character: WritableSignal<CharacterI | null> = signal(null);

  getCharactersList(): CharacterI[] {
    const apiData: Observable<RickMortyApiCharacterResponseI> = this.rickAndMortyService.getCharactersList();
    apiData.pipe(
      mergeMap((response: RickMortyApiCharacterResponseI) => {
        if (response) {
          this.charactersList.set(response.results);
          this.character.set(null); // Reset the character when fetching the list
          return response.results;
        } else {
          throw new Error("Impossible de récupérer les personnages");
        }
      })
    ).subscribe();
    console.log("Character list:", this.charactersList);
    return this.charactersList();
  }

  getCharacterByID(characterId: number): CharacterI | null {
    const apiData: Observable<CharacterI> = this.rickAndMortyService.getCharacterById(characterId);
    apiData.pipe(
      mergeMap((response: any) => {
        if (response) {
          this.character.set(response);
          return response;
        } else {
          throw new Error("Impossible de récupérer le personnage");
        }
      })
    ).subscribe();
    return this.character();
  }
}
