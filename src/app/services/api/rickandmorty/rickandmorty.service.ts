import {inject, Injectable} from "@angular/core";
import {EpisodeI} from '@/interfaces/episode.interface';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {RickMortyApiResponseI} from '@/interfaces/api/rickandmorty.interface';

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

  getEpisodeByID(episodeId: number): EpisodeI|undefined{
    return undefined;
  }

}
