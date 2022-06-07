import { Badge } from "@material-ui/core";
import { TrendingContent } from "../config/apiContentTypes";
import { img_300, unavailable } from "../config/posterBackgrounds";
import "./styles.css";

const SingleTrendCard = ({ data }: { data: TrendingContent }) => {
  const {
    id,
    vote_average,
    poster_path,
    title,
    release_date,
    first_air_date,
    media_type,
    name,
  } = data;
  return (
    <li className="trending-card--bgcontainer">
      <Badge
        badgeContent={vote_average}
        color={vote_average > 6 ? "primary" : "secondary"}
      />
      <img
        className="trending-card--poster"
        src={poster_path ? `${img_300}/${poster_path}` : unavailable}
        alt={title || name}
      />
      <b className="trending-card--title">{title || name}</b>

      <div className="trending-card--subtitle">
        <span>{media_type === "tv" ? "TV Series" : "Movie"}</span>
        <span>{release_date || first_air_date}</span>
      </div>
    </li>
  );
};

export default SingleTrendCard;
