import { URLSearchParams } from "next/dist/compiled/@edge-runtime/primitives/url";
import { useCallback } from "react";
import { useQuery, useQueryClient } from "react-query";
import addAPIKey from "../../Common/utils/api";
import { TFEDiscoveryResponse } from "../../../../types/feTypes";
import { TGenre } from "../../../../types/commonTypes";

const FETCH_GENRES_ENDPOINT = "/api/genres";

export const useFetchGenres = (type: string) => {
  const queryClient = useQueryClient();
  const fetchGenres = useCallback(async (t: string) => {
    const response = await fetch(FETCH_GENRES_ENDPOINT + `?type=${t}`);
    const genres = (await response.json()) as TGenre[];

    return genres;
  }, []);
  const query = useQuery<TGenre[], Error>(["movies"], () => fetchGenres(type));
  return query;
};
