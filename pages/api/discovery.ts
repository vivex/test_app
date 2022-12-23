// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import {
  TGenre,
  TGenreAPIResponse,
  TMovieDiscoveryResponse,
} from "../../types/commonTypes";
import addAPIKey from "../../src/modules/Common/utils/api";
import { TFEDiscoveryResponse, TFEMovieItem } from "../../types/feTypes";

import movieGenreFactory from "./MovieGenreFactory";
import tvGenreFactory from "./TVGenreFactory";
type Data = {
  name: string;
};
type TCache = {
  genre?: Record<string, TGenre>;
  moviesResponse?: Record<string, TFEDiscoveryResponse>;
};
const InMemoryCache: TCache = {};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TFEDiscoveryResponse>
) {
  let movieEndPoint = "https://api.themoviedb.org/3/discover/movie";
  if (req.query.type) {
    movieEndPoint = `https://api.themoviedb.org/3/discover/${req.query.type}`;
  }
  const response = await fetch(
    movieEndPoint +
      "?" +
      new URLSearchParams(addAPIKey(req.query as Record<string, string>))
  );
  const movies = (await response.json()) as TMovieDiscoveryResponse;
  let allGeners: Record<string, TGenre>;
  if (req.query.type === "tv") {
    allGeners = await tvGenreFactory.getIndexedList();
  } else {
    allGeners = await movieGenreFactory.getIndexedList();
  }

  //inject geners in movie
  const feMovies: TFEMovieItem[] = [];
  for (const movie of movies.results) {
    const geners = movie.genre_ids.map((id) => allGeners[id]);
    feMovies.push({
      id: movie.id,
      title: movie.title,
      geners: geners.map((gen) => gen.name),
      release_year: movie.first_air_date
        ? new Date(movie.first_air_date).getFullYear() + ""
        : new Date(movie.release_date).getFullYear() + "",
      backdrop_path: movie.backdrop_path,
      poster_path: movie.poster_path,
    });
  }
  res.status(200).json({
    results: feMovies,
    page: movies.page,
    total_pages: movies.total_pages,
    total_results: movies.total_results,
  });
}
