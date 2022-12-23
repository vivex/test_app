import { TGenre, TGenreAPIResponse } from "../../types/commonTypes";
const FETCH_GENRE_ENDPOINT = "https://api.themoviedb.org/3/genre/movie/list";
import fetch from "node-fetch";
import addAPIKey from "../../src/modules/Common/utils/api";
import _indexBy from "../../utils/indexBy";

class MovieGenreFactory {
  static CACHE: Record<string, TGenre>;
  promise: Promise<Record<string, TGenre>>;
  constructor() {
    this.promise = this.fetchGenre();
  }

  async getIndexedList() {
    return await this.promise;
  }
  async getList(): Promise<TGenre[]> {
    const indexed = await this.promise;
    const list: TGenre[] = [];
    for (const item in indexed) {
      list.push(indexed[item]);
    }
    return list;
  }

  async fetchGenre() {
    if (MovieGenreFactory.CACHE) {
      return MovieGenreFactory.CACHE;
    }
    const response = await fetch(
      FETCH_GENRE_ENDPOINT + "?" + new URLSearchParams(addAPIKey({}))
    );
    const genres = (await response.json()) as TGenreAPIResponse;
    MovieGenreFactory.CACHE = _indexBy<TGenre>(genres.genres, "id");
    return MovieGenreFactory.CACHE;
  }
}

const genreFactory = new MovieGenreFactory();

export default genreFactory;
