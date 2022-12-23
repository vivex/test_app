// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { TGenre } from "../../types/commonTypes";
import movieGenreFactory from "./MovieGenreFactory";
import tvGenreFactory from "./TVGenreFactory";
type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TGenre[]>
) {
  let genres;
  if (req.query.type == "tv") {
    genres = await tvGenreFactory.getList();
  } else {
    genres = await movieGenreFactory.getList();
  }
  res.status(200).json(genres);
}
