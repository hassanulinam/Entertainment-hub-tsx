import { Badge } from "@material-ui/core";
import { TMDBContent } from "../config/apiContentTypes";
import { img_300, unavailable } from "../config/posterBackgrounds";
import ContentModal from "./ContentModal";
import "./styles.css";

const SingleTrendCard = ({ data }: { data: TMDBContent }) => {
  const {
    id,
    vote_average,
    poster_path,
    title,
    release_date,
    first_air_date,
    name,
  } = data;

  const media_type = first_air_date ? "TV Series" : "Movie";

  return (
    <ContentModal media_type={media_type} id={id}>
      <span className="trending-card--bgcontainer">
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
          <span>{media_type}</span>
          <span>{release_date || first_air_date}</span>
        </div>
      </span>
    </ContentModal>
  );
};

export default SingleTrendCard;
