import {inject, Injectable} from "@angular/core";
import {EpisodeI} from '@/interfaces/episode.interface';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {
  RickMortyApiEpisodeResponseI,
  RickMortyApiCharacterResponseI
} from '@/interfaces/api/rickandmorty.interface';
import {CharacterI} from '@/interfaces/character.interface';

@Injectable({
  providedIn: "root"
})
export class RickandmortyService {
  private apiUrl: string = "https://rickandmortyapi.com/api";

  private http = inject(HttpClient);
  private toastr: ToastrService = inject(ToastrService);

  getEpisodesList(page: number = 1): Observable<RickMortyApiEpisodeResponseI> {
    return this.http.get<RickMortyApiEpisodeResponseI>(`${this.apiUrl}/episode?page=${page}`).pipe(
      tap((response: RickMortyApiEpisodeResponseI) => {
        if (response) {
          console.log("API response:", response);
          return response;
        } else {
          this.toastr.error("Impossible de récupérer les épisodes", "Erreur");
          throw new Error("Impossible de récupérer les épisodes");
        }
      })
    );
  }

  getEpisodeByID(episodeId: number): Observable<EpisodeI>{
    console.log("Episode ID:", episodeId);
    return this.http.get<EpisodeI>(`${this.apiUrl}/episode/${episodeId}`).pipe(
      tap((response: EpisodeI) => {
        if (response) {
          return response;
        } else {
          this.toastr.error("Impossible de récupérer cet épisode", "Erreur");
          throw new Error("Impossible de récupérer les épisodes");
        }
      })
    );
  }

  getCharactersList(page: number = 1): Observable<RickMortyApiCharacterResponseI> {
    return this.http.get<RickMortyApiCharacterResponseI>(`${this.apiUrl}/character?page=${page}`).pipe(
      tap((response: RickMortyApiCharacterResponseI) => {
        if (response) {
          return response;
        } else {
          this.toastr.error("Impossible de récupérer les personnages", "Erreur");
          throw new Error("Impossible de récupérer les personnages");
        }
      })
    );
  }

  getCharacterById(characterId: number): Observable<CharacterI> {
    return this.http.get<any>(`${this.apiUrl}/character/${characterId}`).pipe(
      tap((response: CharacterI) => {
        if (response) {
          return response;
        } else {
          this.toastr.error("Impossible de récupérer le personnage", "Erreur");
          throw new Error("Impossible de récupérer le personnage");
        }
      })
    );
  }
}
