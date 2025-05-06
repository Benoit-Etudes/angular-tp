import {EpisodeI} from '@/interfaces/episode.interface';

export interface RickMortyApiResponseI {
  info: ResponseInfoI;
  results: EpisodeI[];
}

export interface ResponseInfoI {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}
