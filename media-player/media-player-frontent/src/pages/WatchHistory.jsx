import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllHistory, removeFromHistoryById } from "../services/AllApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function WatchHistory() {
  const [watchHistory, setWatchHistory] = useState([]);
  const [historyDeleted, setHistoryDeleted] = useState(false);

  const getWatchHistory = async () => {
    const response = await getAllHistory();
    console.log(response.data);
    if (response.data) {
      setWatchHistory(response.data);
    }
  };

  const removeFromHistory = async (videoId) => {
    const response = await removeFromHistoryById(videoId);
    if (response.status == 200) {
      toast.success("Video removed from history!");
      setHistoryDeleted(!historyDeleted);
    } else {
      toast.error("Failed to remove from history!");
    }
  };

  useEffect(() => {
    getWatchHistory();
    console.log(watchHistory);
  }, [historyDeleted]);

  return (
    <>
      <div className="container mt-5 d-flex justify-content-between">
        <h3>Watch History</h3>
        <Link
          to="/home"
          style={{ textDecoration: "none", color: "black", fontWeight: "750" }}
        >
          <i className="fa-solid fa-arrow-left me-1"></i>&nbsp;Back to home
        </Link>
      </div>
      <table className="table table-striped border rounded container mb-5 mt-5">
        <thead>
          <tr>
            <th>#</th>
            <th>Caption</th>
            <th>URL</th>
            <th>Timestamp</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {watchHistory?.length > 0 ? (
            watchHistory?.map((item) => (
              <tr>
                <td>{item.id}</td>
                <td>{item.caption}</td>
                <td>
                  <a href={item.youTubeLink} target="_blank">
                    Link
                  </a>
                </td>
                <td>{item.timestamp}</td>
                <td>
                  <button
                    className="btn btn-light text-danger border-0"
                    onClick={() => removeFromHistory(item.id)}
                  >
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <p>Nothing to show</p>
          )}
        </tbody>
      </table>
      <ToastContainer autoClose={2000} />
    </>
  );
}

export default WatchHistory;
