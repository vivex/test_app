import Link from "@mui/material/Link";
import { TwoPaneLayout } from "../../Common/components/TwoPaneLayout";
import styles from "../styles/MovieList.module.css";
import MUIContainer from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import MUIBox from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { useMovieDiscovery } from "../apiHooks/useMovieDiscovery";
import { MovieListCard } from "./MovieListCard";
import { SearchPane, TFilterOptions } from "./SearchPane";
import { useCallback, useState } from "react";
import { Button } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const MovieContainer = styled(MUIContainer)({
  padding: "0px !important",
  maxWidth: "100% !important",
});

const LeftBox = styled(MUIBox)({
  overflow: "scroll",
  height: "90vh",
});

const StyledTextField = styled(TextField)({
  borderBottom: "0px !important",
});

export function MovieListPage() {
  const [filterOpt, setFilterOpt] = useState<TFilterOptions>({});
  const { isLoading, data } = useMovieDiscovery(filterOpt);
  console.log("filterOpt", filterOpt);
  const onChange = useCallback((key: keyof TFilterOptions, opt: string) => {
    setFilterOpt((value) => {
      return {
        ...value,
        [key]: opt,
      };
    });
  }, []);
  const onSortByChange = useCallback(
    (sortBy: string) => () => {
      setFilterOpt((value) => {
        return {
          ...value,
          sort_by: sortBy,
        };
      });
    },
    []
  );
  return (
    <MovieContainer>
      {isLoading ? (
        <Backdrop
          open={true}
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : null}
      <Grid container padding={0} spacing={0} gap={0}>
        <Grid item xs={9} paddingLeft={4} paddingRight={4}>
          <Grid container gap={0} paddingTop={3}>
            <Grid item xs={3}>
              <Typography variant="h5" fontWeight={300}>
                Discover
              </Typography>
            </Grid>
            <Grid item xs={7} marginTop={1}>
              <Grid container spacing={2}>
                <Grid item>
                  <Button
                    color={
                      filterOpt.sort_by === "popularity.desc"
                        ? "secondary"
                        : "primary"
                    }
                    size="medium"
                    variant="text"
                    onClick={onSortByChange("popularity.desc")}
                  >
                    POPULAR
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    size="medium"
                    variant="text"
                    color={
                      filterOpt.sort_by === "vote_count.desc"
                        ? "secondary"
                        : "primary"
                    }
                    onClick={onSortByChange("vote_count.desc")}
                  >
                    TREND
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    size="medium"
                    variant="text"
                    color={
                      filterOpt.sort_by === "release_date.desc"
                        ? "secondary"
                        : "primary"
                    }
                    onClick={onSortByChange("release_date.desc")}
                  >
                    NEWEST
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    size="medium"
                    variant="text"
                    color={
                      filterOpt.sort_by === "vote_average.desc"
                        ? "secondary"
                        : "primary"
                    }
                    onClick={onSortByChange("vote_average.desc")}
                  >
                    TOP RATED
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <StyledTextField
                sx={{
                  "& .MuiInput-root:before": {
                    borderBottom: "0px !important",
                  },
                }}
                placeholder="Search"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />
            </Grid>
          </Grid>
          <LeftBox>
            {!isLoading && data?.results.length == 0 ? (
              <Typography align="center">No Result</Typography>
            ) : null}
            <Grid container spacing={2} marginTop={6}>
              {data?.results.map((movieItem) => (
                <Grid key={movieItem.id} item xs={1} md={3} sm={4}>
                  <MovieListCard item={movieItem} />
                </Grid>
              ))}
            </Grid>
          </LeftBox>
        </Grid>
        <Grid item xs={3} height="95vh" flexGrow={1} overflow="hidden">
          <SearchPane
            onChange={onChange}
            selectedFilters={filterOpt}
            type={filterOpt.type || ""}
          />
        </Grid>
      </Grid>
    </MovieContainer>
  );
}
