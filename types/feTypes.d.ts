export type TFEMovieItem = {
  id: number;
  title: string;
  geners: string[];
  release_year: string;
  backdrop_path: string;
  poster_path: string;
};

export type TFEDiscoveryResponse = {
  page: number;
  total_results: number;
  total_pages: number;
  results: TFEMovieItem[];
};
