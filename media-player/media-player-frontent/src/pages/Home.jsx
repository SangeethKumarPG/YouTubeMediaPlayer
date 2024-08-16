import React, { useState } from "react";
import Add from "../components/Add";
import View from "../components/View";
import { Link } from "react-router-dom";
import Category from "../components/Category";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const [videoDeleteStatus, setVideoDeleteStatus] = useState({});
  const [uploadVideoStatus, setUploadVideoStatus] = useState({});
  return (
    <div>
      <div className="container mt-5 mb-5 d-flex align-items-center justify-content-between">
        <div className="add_video">
          <Add setUploadVideoStatus={setUploadVideoStatus} />
        </div>
        <Link
          to="/watch"
          style={{ textDecoration: "none", color: "black", fontSize: "1.5rem" }}
        >
          Watch History
        </Link>
      </div>
      <div className="container mt-5 mb-5 d-flex justify-content-between">
        <div className="all-videos">
          <h4>All Videos</h4>
          <View
            uploadVideoStatus={uploadVideoStatus}
            deleteVideoStatus={videoDeleteStatus}
            setDeleteVideoStatus={setVideoDeleteStatus}
          />
        </div>
        <div className="category">
          <Category />
        </div>
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default Home;
