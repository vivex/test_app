import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { MovieListPage } from "../src/modules/MovieList/components/MovieList";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "../src/modules/Common/components/Link";
import { SquarePageLayout } from "../src/modules/Common/components/SquarePageLayout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <SquarePageLayout>
      <MovieListPage />
    </SquarePageLayout>
  );
}
