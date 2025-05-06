export interface EpisodeI{
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
}

export interface EpisodeModelI{
  episode?: EpisodeI;
}
