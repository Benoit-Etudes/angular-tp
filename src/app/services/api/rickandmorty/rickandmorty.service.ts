import {inject, Injectable} from "@angular/core";
import {EpisodeI} from '@/interfaces/episode.interface';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {RickMortyApiErrorI, RickMortyApiResponseI} from '@/interfaces/api/rickandmorty.interface';

@Injectable({
  providedIn: "root"
})
export class RickandmortyService {
  private apiUrl: string = "https://rickandmortyapi.com/api";

  private http = inject(HttpClient);
  private toastr: ToastrService = inject(ToastrService);

  getEpisodesList(): Observable<RickMortyApiResponseI> {
    return this.http.get<RickMortyApiResponseI>(`${this.apiUrl}/episode`).pipe(
      tap((response: RickMortyApiResponseI) => {
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

}
