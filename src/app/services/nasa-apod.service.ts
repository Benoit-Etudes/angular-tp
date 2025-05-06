import {inject, Injectable, signal, WritableSignal} from "@angular/core";
import {EpisodeI} from '@/interfaces/episode.interface';
import {RickandmortyService} from '@/services/api/rickandmorty/rickandmorty.service';
import {mergeMap, switchMap} from 'rxjs/operators';
import {RickMortyApiEpisodeResponseI} from '@/interfaces/api/rickandmorty.interface';
import {Observable} from 'rxjs';
import {NasaService} from '@/services/api/nasa/nasa.service';
import {NasaApiResponseI} from '@/interfaces/api/nasa.interface';

@Injectable({
  providedIn: "root"
})
export class NasaApodService {
  private nasaService: NasaService = inject(NasaService);

  apod: WritableSignal<NasaApiResponseI | null> = signal<NasaApiResponseI | null>(null);

  getApod(): NasaApiResponseI | null {
    const apiData: Observable<NasaApiResponseI> = this.nasaService.getTodayImage();
    apiData.pipe(
      mergeMap((response: any) => {
        if (response) {
          this.apod.set(response);
          return response;
        } else {
          throw new Error("Impossible de récupérer l'image du jour");
        }
      })
    ).subscribe();
    console.log("APOD list:", this.apod);
    return this.apod();
  }
}
