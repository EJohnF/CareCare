export interface MovieRating {
  Source: string;
  Value: string;
}

export interface Movie {
  Actors?: string;
  Awards?: string;
  BoxOffice?: string;
  Country?: string;
  DVD?: string;
  Director?: string;
  Genre?: string;
  Language?: string;
  Metascore?: string;
  Plot?: string;
  Poster: string;
  Production?: string;
  Rated?: string;
  Ratings?: MovieRating[];
  Released?: string;
  Response?: string;
  Runtime?: string;
  Title: string;
  Type: string;
  Website?: string;
  Writer?: string;
  Year: string;
  imdbID: string;
  imdbRating?: string;
  imdbVotes?: string;
}

export interface Filters {
  title?: string;
  type?: 'movie' | 'series' | 'episode';
  year?: number;
}
