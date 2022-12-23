import { URLSearchParams } from "next/dist/compiled/@edge-runtime/primitives/url";
import { useCallback } from "react";
import { useQuery, useQueryClient } from "react-query";
import addAPIKey from "../../Common/utils/api";
import { TFEDiscoveryResponse } from "../../../../types/feTypes";
import { TMovieDiscoveryQuery } from "../../../../types/commonTypes";
import { TFilterOptions } from "../components/SearchPane";

const FETCH_MOVIE_ENDPOINT = "/api/discovery";

export const useMovieDiscovery = (req: TFilterOptions) => {
  const queryClient = useQueryClient();
  const fetchMovies = useCallback(async (query: TFilterOptions) => {
    const urlQuery: Record<string, string> = {};
    if (query.from) {
      urlQuery["primary_release_date.gte"] = query.from;
    }
    if (query.to) {
      urlQuery["primary_release_date.lte"] = query.to;
    }
    if (query.genres) {
      urlQuery["with_genres"] = query.genres;
    }
    if (query.sort_by) {
      urlQuery["sort_by"] = query.sort_by;
    }
    if (query.type) {
      urlQuery["type"] = query.type;
    }
    const response = await fetch(
      FETCH_MOVIE_ENDPOINT + "?" + new URLSearchParams(urlQuery)
    );
    const movies = (await response.json()) as TFEDiscoveryResponse;

    return movies;
  }, []);
  const query = useQuery<TFEDiscoveryResponse, Error>(
    ["movies", { query: req }],
    () => fetchMovies(req)
  );
  return query;
};
