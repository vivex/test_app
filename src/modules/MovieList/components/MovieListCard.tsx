import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TFEMovieItem } from "../../../../types/feTypes";

type MovieListCardProps = {
  item: TFEMovieItem;
};
export const MovieListCard = ({ item }: MovieListCardProps) => {
  return (
    <Card sx={{ boxShadow: "none" }} component="div">
      <CardMedia
        component="img"
        alt="green iguana"
        height="100%"
        image={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="subtitle1"
          component="div"
          align="center"
          color="primary"
        >
          {item.title}
        </Typography>
        <Typography align="center" variant="body2" color="text.secondary">
          {item.geners[0]} {item.release_year}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
};
