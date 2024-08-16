import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
// import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import {
  downloadVideo,
  downloadAudio,
  deleteVideo,
  addToHistory,
} from "../services/AllApi";
import "./VideoCard.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";

function VideoCard({ displayVideo, setVideoDeleteStatus }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    videoPlayed();
  };

  const downloadYoutubeVideo = async () => {
    const videoId = displayVideo?.youTubeLink.slice(-11);
    toast.info("Please wait for a minute for the download to start.");
    const result = await downloadVideo(videoId);
  };

  const downloadMp3 = async () => {
    const videoId = displayVideo?.youTubeLink.slice(-11);
    console.log(videoId);
    toast.info("Please wait for a minute for the download to start.");
    const result = await downloadAudio(videoId);
  };

  const deleteVideoItem = async (id) => {
    const caption = displayVideo?.caption;
    const response = await deleteVideo(id);
    if (response.status == 200) {
      console.log(response.status);
      setVideoDeleteStatus({
        success: true,
        message: `${caption} deleted successfully!!`,
      });
    } else {
      setVideoDeleteStatus({
        success: false,
        message: `${caption} deleted failed!!`,
      });
    }
  };

  const itemDragged = (e) => {
    console.log("item dragged");
    console.log(displayVideo?.id);
    e.dataTransfer.setData("text/plain", JSON.stringify(displayVideo));
  };

  const formatDateTime = (date) => {
    return format(date, "dd-MM-yyyy hh:mm a");
  };
  const videoPlayed = async () => {
    // console.log(displayVideo);
    const now = new Date();
    await addToHistory({
      ...displayVideo,
      timestamp: formatDateTime(now),
    });
    // console.log("video played");
  };
  return (
    <>
      <Card
        // style={{ width: "18rem", padding: "0.5rem" }}
        draggable
        onDragStart={itemDragged}
      >
        <Card.Img
          variant="top"
          // src="https://wallpapercave.com/wp/wp4806950.jpg"
          src={displayVideo?.imageUrl}
          onClick={handleShow}
        />
        <Card.Body>
          <div className="d-flex justify-content-between p-1">
            <Card.Title>{displayVideo?.caption} </Card.Title>
            <Button
              variant="light"
              className="border-0 ms-2"
              onClick={() => deleteVideoItem(displayVideo.id)}
            >
              <i className="fa-solid fa-trash"></i>
            </Button>
          </div>
        </Card.Body>
      </Card>
      <Modal
        show={show}
        onHide={handleClose}
        // backdrop="static"
        // keyboard={false}
        // centered
        // size="lg"
        fullscreen={true}
        id="video-model"
      >
        {/* <Modal.Header closeButton>
         
        </Modal.Header> */}
        <Modal.Body>
          <div className="d-flex align-items-left justify-content-center">
            <iframe
              src={displayVideo?.youTubeLink}
              // style={{
              //   display: "flex",
              //   alignItems: "center",
              //   justifyContent: "center",
              //   padding:"1rem"
              // }}
              id="video-frame"
            />
          </div>

          <div className="d-flex align-items-left justify-content-evenly mt-3">
            <Button variant="light" onClick={handleClose}>
              Close
            </Button>
            <Button variant="secondary" onClick={downloadMp3}>
              Download Audio
            </Button>

            <Button variant="warning" onClick={downloadYoutubeVideo}>
              Download Video
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      {/* <ToastContainer autoClose={2000} containerId={"video-card-toast"}/> */}
    </>
  );
}

export default VideoCard;
