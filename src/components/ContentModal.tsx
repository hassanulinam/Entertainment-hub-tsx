import React, { useEffect, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { modalContentApi, videoDataApi } from "../config/apiUrls";
import axios from "axios";
import "./styles.css";

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
  })
);

type PropType = { children: JSX.Element; media_type: string; id: number };

export default function ContentModal({ children, media_type, id }: PropType) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [videoData, setVideoData] = useState<any>();
  const [content, setContent] = useState<any>();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    const URL = modalContentApi(media_type, id);
    const { data } = await axios.get(URL);
    setContent(data);
  };

  const fetchVideo = async () => {
    const URL = videoDataApi(media_type, id);
    const { data } = await axios.get(URL);
    console.log(data);
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
  }, []);

  return (
    <li className="card-modal--wrapper">
      <span onClick={handleOpen}>{children}</span>
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
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Transition modal</h2>
            <p id="transition-modal-description">
              react-transition-group animates me.
            </p>
          </div>
        </Fade>
      </Modal>
    </li>
  );
}
