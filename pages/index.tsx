import { Inter } from "@next/font/google";
import { MovieListPage } from "../src/modules/MovieList/components/MovieList";

import { SquarePageLayout } from "../src/modules/Common/components/SquarePageLayout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <SquarePageLayout>
      <MovieListPage />
    </SquarePageLayout>
  );
}
