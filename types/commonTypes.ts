export type TMovieListItem = {
  popularity: number;
  vote_count: number;
  video: boolean;
  poster_path: string;
  id: number;
  adult: boolean;
  backdrop_path: string;
  original_language: string;
  original_title: string;
  genre_ids: string[];
  title: string;
  vote_average: number;
  overview: string;
  release_date: string;
};

export type TMovieDiscoveryResponse = {
  page: number;
  total_results: number;
  total_pages: number;
  results: TMovieListItem[];
};
export enum TSortByEnum {
  POPULARITY_ASC = "popularity.asc",
  POPULARITY_DESC = "popularity.desc",
}
export type TMovieDiscoveryQuery = {
  sort_by: TSortByEnum;
  certification_country: string;
  certification: string;
  page: number;
  year: number;
  "vote_count.gte": string;
  "vote_count.lte": string;
} & Record<string, string>;

export type TGenre = {
  id: number;
  name: string;
};

export type TGenreAPIResponse = {
  genres: TGenre[];
};
