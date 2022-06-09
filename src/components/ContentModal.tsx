import { useEffect, useRef, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { modalContentApi, videoDataApi } from "../config/apiUrls";
import axios from "axios";
import {
  img_500,
  unavailableImg,
  unavailableLandscape,
} from "../config/posterBackgrounds";
import { Button } from "@material-ui/core";
import { YouTube } from "@material-ui/icons";

import "./styles.css";
import ModalGalleryCarousel from "./ModalGalleryCarousel";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      width: "90%",
      height: "80%",
      backgroundColor: "#39445a",
      border: "1px solid #282c34",
      borderRadius: 10,
      color: "white",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(1, 1, 3),
    },
    emptyPaper: {
      backgroundColor: "#39445a",
      border: "1px solid #282c34",
      borderRadius: 10,
      boxShadow: theme.shadows[5],
      textAlign: "center",
      padding: "10%",
      fontSize: "5vw",
      color: "tomato",
    },
  })
);

type PropType = { children: JSX.Element[]; media_type: string; id: number };

export default function ContentModal({ children, media_type, id }: PropType) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [ytTrailerKey, setYtTrailerKey] = useState("");
  const [content, setContent] = useState<any>(undefined);
  const fadeRef = useRef(null);
  const modalRef = useRef(null);
  const wrapperRef = useRef(null);

  const fetchData = async () => {
    try {
      console.log("Fetching content for MODAL");
      const URL = modalContentApi(media_type, id);
      const { data } = await axios.get(URL);
      setContent(data);
    } catch (err: any) {
      console.log(err.message, " While fetching ", id);
      setContent(undefined);
    }
  };

  const fetchVideo = async () => {
    try {
      const URL = videoDataApi(media_type, id);
      const { data } = await axios.get(URL);
      setYtTrailerKey(data.results[0]?.key);
      console.log("Trailers Data", URL, data);
    } catch (err: any) {
      console.log(err.message);
      setYtTrailerKey("");
    }
  };

  const handleOpen = () => {
    setOpen(true);
    console.log("YOUTUBE KEY: ", ytTrailerKey);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
    return () => {
      setContent(undefined);
      setYtTrailerKey("");
    };
  }, []);

  return (
    <li>
      <span
        className="card-modal--wrapper"
        onClick={handleOpen}
        ref={wrapperRef}
      >
        {children}
      </span>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        ref={modalRef}
      >
        <Fade in={open} ref={fadeRef}>
          {content ? (
            <div className={classes.paper}>
              <div className="modal-content--wrapper">
                <img
                  alt={content.name || content.title}
                  className="modal-content--portrait"
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailableImg
                  }
                />
                <img
                  alt={content.name || content.title}
                  className="modal-content--landscape"
                  src={
                    content.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailableLandscape
                  }
                />
                <div className="modal-content--about">
                  <span className="modal-content--title">
                    {content.name || content.title} (
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "------"
                    ).substring(0, 4)}
                    )
                  </span>
                  {content.tagline && (
                    <i className="modal-content--tagline">{content.tagline}</i>
                  )}
                  <span className="modal-content--description">
                    {content.overview}
                  </span>
                  <div className="modal-content--carousel-wrapper">
                    <ModalGalleryCarousel media_type={media_type} id={id} />
                  </div>
                  <Button
                    variant="contained"
                    startIcon={<YouTube />}
                    color="secondary"
                    target="_blank"
                    href={`https://www.youtube.com/watch?v=${ytTrailerKey}`}
                    disabled={!ytTrailerKey}
                  >
                    {ytTrailerKey
                      ? "Watch the Trailer"
                      : "Trailer not available"}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className={classes.emptyPaper}>
              <div className="modal-content--wrapper">
                <b className="modal-content--not-found">Data Not Available</b>
              </div>
            </div>
          )}
        </Fade>
      </Modal>
    </li>
  );
}
