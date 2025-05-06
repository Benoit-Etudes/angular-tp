import {EpisodeI} from '@/interfaces/episode.interface';
import {CharacterI} from '@/interfaces/character.interface';

export interface RickMortyApiEpisodeResponseI {
  info: ResponseInfoI;
  results: EpisodeI[];
}

export interface RickMortyApiCharacterResponseI {
  info: ResponseInfoI;
  results: CharacterI[];
}

export interface ResponseInfoI {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface RickMortyApiErrorI {
  error: string;
}
