import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import { getAllVideos } from "../services/AllApi";
import { Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";

function View({ uploadVideoStatus, deleteVideoStatus, setDeleteVideoStatus }) {
  const [allVideos, setAllVideos] = useState([]);
  const getVideos = async () => {
    const response = await getAllVideos();
    const { data } = response;
    console.log(data.length);
    setAllVideos(data);
  };
  useEffect(() => {
    getVideos();
  }, [uploadVideoStatus, deleteVideoStatus]);

  useEffect(() => {
    if (deleteVideoStatus?.message) {
      if (deleteVideoStatus?.success) {
        toast.success(deleteVideoStatus?.message);
      } else {
        toast.error(deleteVideoStatus?.message);
      }
    }
  }, [deleteVideoStatus]);
  return (
    <>
      <Row className="mt-5">
        {allVideos.length > 0 ? (
          allVideos?.map((videos) => (
            <Col
              key={videos.id}
              sm={8}
              md={6}
              lg={4}
              xs={12}
              
              className="mt-1 mb-1"
            >
              <VideoCard
                displayVideo={videos}
                setVideoDeleteStatus={setDeleteVideoStatus}
              />
            </Col>
          ))
        ) : (
          <p>Nothing to display</p>
        )}
      </Row>
    </>
  );
}

export default View;
