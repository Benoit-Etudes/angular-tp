import {inject, Injectable, signal, computed, Signal} from "@angular/core";
import {RickandmortyService} from '@/services/api/rickandmorty/rickandmorty.service';
import {
  ResponseInfoI,
  RickMortyApiCharacterResponseI,
} from '@/interfaces/api/rickandmorty.interface';
import {catchError, finalize, map, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {CharacterI} from '@/interfaces/character.interface';

@Injectable({
  providedIn: "root"
})
export class CharacterService {
  private rickAndMortyService = inject(RickandmortyService);

  private loading = signal(false);
  isLoading: Signal<boolean> = this.loading.asReadonly();

  private charactersListSignal = signal<CharacterI[]>([]);
  charactersList: Signal<CharacterI[]> = this.charactersListSignal.asReadonly();

  private characterSignal = signal<CharacterI | null>(null);
  character: Signal<CharacterI | null> = this.characterSignal.asReadonly();

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

  fetchCharactersList(page: number = 1): void {
    this.loading.set(true);
    this.currentPageSignal.set(page);

    this.rickAndMortyService.getCharactersList(page)
      .pipe(
        tap((response: RickMortyApiCharacterResponseI) => {
          this.infosSignal.set(response.info);
          this.charactersListSignal.set(response.results);
          this.characterSignal.set(null); // Réinitialiser le personnage lors de la récupération de la liste
        }),
        catchError(error => {
          console.error('Erreur lors de la récupération des personnages', error);
          return of(null);
        }),
        finalize(() => this.loading.set(false))
      )
      .subscribe();
  }

  fetchCharacterByID(characterId: number): Observable<boolean> {
    this.loading.set(true);
    this.characterSignal.set(null);

    return this.rickAndMortyService.getCharacterById(characterId)
      .pipe(
        map(character => {
          if (character) {
            this.characterSignal.set(character);
            return true;
          }
          return false;
        }),
        catchError(error => {
          console.error('Erreur lors de la récupération du personnage', error);
          return of(false);
        }),
        finalize(() => {
          this.loading.set(false);
        })
      );
  }

  nextPage(): void {
    if (this.hasNextPage()) {
      this.fetchCharactersList(this.currentPage() + 1);
    }
  }

  prevPage(): void {
    if (this.hasPrevPage()) {
      this.fetchCharactersList(this.currentPage() - 1);
    }
  }
}
