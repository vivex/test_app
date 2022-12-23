import { styled } from "@mui/material/styles";
import MUIBox from "@mui/material/Box";

import { Grid, Typography } from "@mui/material";
import { Select, TSelectOption } from "../../Input/components/Select";
import { useFetchGenres } from "../apiHooks/useFetchGenres";
import { useMemo } from "react";
import InputLabel from "@mui/material/InputLabel";

const RightBox = styled(MUIBox)(({ theme }) => {
  return {
    boxShadow: "0 0 15px rgba(0,0,0,0.75) !important",
    backgroundColor: theme.palette.mode === "dark" ? "#131a20" : "#fff",
    clipPath: "inset(0px 0px 0px -30px)",
    width: "100%",
    height: "100%",
  };
});
type TSearchPaneProps = {
  onChange: (name: keyof TFilterOptions, value: string) => void;
  selectedFilters: TFilterOptions;
  type: string;
};
export type TFilterOptions = {
  genres?: string;
  from?: string;
  to?: string;
  rating?: number;
  type?: string;
  sort_by?: string;
};
const YEARS = [
  {
    label: "2010",
    value: "2010",
  },
  {
    label: "2011",
    value: "2011",
  },
  {
    label: "2012",
    value: "2012",
  },
];
export const SearchPane = ({
  onChange,
  selectedFilters,
  type,
}: TSearchPaneProps) => {
  const { data: genreList } = useFetchGenres(type);

  const genreOptions = useMemo<TSelectOption[]>(() => {
    if (!genreList) return [];
    return genreList?.map((genr) => ({
      label: genr.name,
      value: genr.id + "",
    }));
  }, [genreList]);
  return (
    <RightBox>
      <Grid container width="100%" gap={4} padding={4}>
        <Grid item xs={12}>
          <Typography variant="h5" color="text.secondary">
            Discover Option
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Select
            data-testid="discover_type"
            options={[
              { label: "Movies", value: "movie" },
              { label: "TV", value: "tv" },
            ]}
            label="Type"
            value={selectedFilters.type || ""}
            onChange={(evt) => {
              onChange("type", evt.target.value as string);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Select
            options={genreOptions || []}
            label="Genre"
            value={selectedFilters.genres || ""}
            onChange={(evt) => {
              onChange("genres", evt.target.value as string);
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <InputLabel>Year</InputLabel>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Select
                value={selectedFilters.from || ""}
                options={YEARS}
                label="From"
                onChange={(evt) => {
                  onChange("from", evt.target.value as string);
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Select
                value={selectedFilters.to || ""}
                options={YEARS}
                label="To"
                onChange={(evt) => {
                  onChange("to", evt.target.value as string);
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </RightBox>
  );
};
