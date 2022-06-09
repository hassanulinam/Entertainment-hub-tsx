import axios from "axios";
import { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { creditsApi } from "../config/apiUrls";
import { img_300, noPicture } from "../config/posterBackgrounds";
import "./styles.css";

type PropType = {
  media_type: string;
  id: number;
};

const responsive = {
  0: { items: 3 },
  512: { items: 5 },
  1024: { items: 7 },
};

const ModalGalleryCarousel = ({ media_type, id }: PropType) => {
  const [credits, setCredits] = useState<any>([]);

  const fetchCredits = async () => {
    const URL = creditsApi(media_type, id);
    const { data } = await axios.get(URL);
    console.log("Credits :", data);
    setCredits(data.cast);
  };

  useEffect(() => {
    fetchCredits();
  }, []);

  const items = credits?.map((c: any) => (
    <div className="carousel-item--wrapper">
      <img
        src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
        alt={c?.name}
        className="carousel-item--img"
        onDragStart={(e) => e.preventDefault()}
      />
      <b className="carousel-item--text">{c?.name}</b>
    </div>
  ));

  return (
    <AliceCarousel
      autoPlay
      autoPlayInterval={1500}
      infinite
      disableDotsControls
      disableButtonsControls
      mouseTracking
      items={items}
      responsive={responsive}
    />
  );
};

export default ModalGalleryCarousel;
