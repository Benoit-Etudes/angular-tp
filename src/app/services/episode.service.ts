import {inject, Injectable, signal, computed, Signal} from "@angular/core";
import {EpisodeI} from '@/interfaces/episode.interface';
import {RickandmortyService} from '@/services/api/rickandmorty/rickandmorty.service';
import {ResponseInfoI, RickMortyApiEpisodeResponseI} from '@/interfaces/api/rickandmorty.interface';
import {catchError, finalize, map, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class EpisodeService {
  private rickAndMortyService = inject(RickandmortyService);

  private loading = signal(false);
  isLoading: Signal<boolean> = this.loading.asReadonly();

  private episodesListSignal = signal<EpisodeI[]>([]);
  episodesList: Signal<EpisodeI[]> = this.episodesListSignal.asReadonly();

  private episodeSignal = signal<EpisodeI | null>(null);
  episode: Signal<EpisodeI | null> = this.episodeSignal.asReadonly();

  private infosSignal = signal<ResponseInfoI>({
    count: 0,
    pages: 0,
    next: null,
    prev: null
  });
  infos: Signal<ResponseInfoI> = this.infosSignal.asReadonly();

  private currentPageSignal = signal<number>(1);
  currentPage: Signal<number> = this.currentPageSignal.asReadonly();

  hasNextPage = computed(() => this.infos().next !== null);

  hasPrevPage = computed(() => this.infos().prev !== null);

  fetchEpisodesList(page: number = 1): void {
    this.loading.set(true);
    this.currentPageSignal.set(page);

    this.rickAndMortyService.getEpisodesList(page)
      .pipe(
        tap((response: RickMortyApiEpisodeResponseI) => {
          this.infosSignal.set(response.info);
          this.episodesListSignal.set(response.results);
          this.episodeSignal.set(null); // Réinitialiser l'épisode lors de la récupération de la liste
        }),
        catchError(error => {
          console.error('Erreur lors de la récupération des épisodes', error);
          return of(null);
        }),
        finalize(() => this.loading.set(false))
      )
      .subscribe();
  }

  fetchEpisodeByID(episodeId: number): Observable<boolean> {
    this.loading.set(true);
    this.episodeSignal.set(null);

    return this.rickAndMortyService.getEpisodeByID(episodeId)
      .pipe(
        map(episode => {
          if (episode) {
            this.episodeSignal.set(episode);
            return true;
          }
          return false;
        }),
        catchError(error => {
          console.error('Erreur lors de la récupération de l\'épisode', error);
          return of(false);
        }),
        finalize(() => {
          this.loading.set(false);
        })
      );
  }

  nextPage(): void {
    if (this.hasNextPage()) {
      this.fetchEpisodesList(this.currentPage() + 1);
    }
  }

  prevPage(): void {
    if (this.hasPrevPage()) {
      this.fetchEpisodesList(this.currentPage() - 1);
    }
  }
}
