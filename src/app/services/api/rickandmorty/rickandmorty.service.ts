import {inject, Injectable} from "@angular/core";
import {EpisodeI} from '@/interfaces/episode.interface';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
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
  private toastr = inject(ToastrService);

  getEpisodesList(page: number = 1): Observable<RickMortyApiEpisodeResponseI> {
    return this.http.get<RickMortyApiEpisodeResponseI>(`${this.apiUrl}/episode?page=${page}`)
      .pipe(
        catchError(error => {
          this.toastr.error("Impossible de récupérer les épisodes", "Erreur");
          return throwError(() => new Error("Impossible de récupérer les épisodes"));
        })
      );
  }

  getEpisodeByID(episodeId: number): Observable<EpisodeI> {
    return this.http.get<EpisodeI>(`${this.apiUrl}/episode/${episodeId}`)
      .pipe(
        catchError(error => {
          this.toastr.error("Impossible de récupérer cet épisode", "Erreur");
          return throwError(() => new Error("Impossible de récupérer cet épisode"));
        })
      );
  }

  getCharactersList(page: number = 1): Observable<RickMortyApiCharacterResponseI> {
    return this.http.get<RickMortyApiCharacterResponseI>(`${this.apiUrl}/character?page=${page}`)
      .pipe(
        catchError(error => {
          this.toastr.error("Impossible de récupérer les personnages", "Erreur");
          return throwError(() => new Error("Impossible de récupérer les personnages"));
        })
      );
  }

  getCharacterById(characterId: number): Observable<CharacterI> {
    return this.http.get<CharacterI>(`${this.apiUrl}/character/${characterId}`)
      .pipe(
        catchError(error => {
          this.toastr.error("Impossible de récupérer le personnage", "Erreur");
          return throwError(() => new Error("Impossible de récupérer le personnage"));
        })
      );
  }
}
