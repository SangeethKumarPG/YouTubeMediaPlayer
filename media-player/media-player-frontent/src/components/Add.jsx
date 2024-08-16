import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import { getVideoDetails, uploadVideo } from "../services/AllApi";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Add({ setUploadVideoStatus }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [videoDetails, setVideoDetails] = useState({
    caption: "",
    imageUrl: "",
    youTubeLink: "",
  });

  const addVideoDetails = async () => {
    const { caption, imageUrl, youTubeLink } = videoDetails;
    if (!caption || !imageUrl || !youTubeLink) {
      // alert("Please fill the form completely");
      toast.warning("Please fill the form completely!", {
        containerId: "add-container",
      });
    } else {
      console.log("final data : ", videoDetails);
      const response = await uploadVideo(videoDetails);
      console.log(response);
      if (response.status == 201) {
        setUploadVideoStatus(response.data);
        toast.success(`${response.data.caption} uploaded succesfully!!!`);
      } else {
        toast.error(`${response.status} error`);
      }
    }
    console.log(videoDetails);
    handleClose();
  };

  const getEmbeddedLink = async (data) => {
    console.log(data);
    const youtubeUrlPattern =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})$/;

    if (!youtubeUrlPattern.test(data)) {
      // alert("invalid url");
      toast.warning("invalid url ");
      linkField.value = "";
    } else {
      const link = `https://www.youtube.com/embed/${data.slice(-11)}`;
      console.log(link);
      setVideoDetails({ ...videoDetails, youTubeLink: link });
      // const uuidv4 = uuid();
      const videoDetailResponse = await getVideoDetails(data.slice(-11)).then(
        (res) => {
          console.log(res.title);
          console.log(res.thumbnail.url);

          setVideoDetails((prevDetails) => ({
            ...prevDetails,
            // videoId: uuidv4,
            youTubeLink: link,
            imageUrl: res.thumbnail.url,
            caption: res.title.slice(0, 30) + "...",
          }));
          // videoUID.value = uuidv4;
          videoCaption.value = res.title.slice(0, 30) + "...";
          thumbnailURL.value = res.thumbnail.url;
        }
      );
    }
    // console.log(videoDetailResponse)
  };

  return (
    <div>
      <div className="d-flex align-items-center ">
        <h5>Upload a new video</h5>
        <button className="btn btn-light ms-1 border-0" onClick={handleShow}>
          <i class="fa-solid fa-cloud-arrow-up"></i>
        </button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="border-bottom-0">
          <Modal.Title>
            Upload Video <i className="fa-solid fa-film text-warning"></i>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ fontWeight: "700" }}>Please fill the form</p>
          <Form className="border border-dark p-3 rounded">
            <Form.Group className="mb-3" controlId="formGroupCaption">
              <Form.Control
                type="text"
                placeholder="Enter Video Caption"
                onChange={(e) =>
                  setVideoDetails({ ...videoDetails, caption: e.target.value })
                }
                id="videoCaption"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupURL">
              <Form.Control
                type="text"
                placeholder="Enter Image URL"
                onChange={(e) =>
                  setVideoDetails({ ...videoDetails, imageUrl: e.target.value })
                }
                id="thumbnailURL"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupLink">
              <Form.Control
                type="text"
                placeholder="Enter Video YouTube Link"
                onChange={(e) =>
                  // setVideoDetails({
                  //   ...videoDetails,
                  //   youTubeLink: e.target.value,
                  // })
                  getEmbeddedLink(e.target.value)
                }
                id="linkField"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="border-top-0">
          <Button variant="dark" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="warning" onClick={addVideoDetails}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Add;
