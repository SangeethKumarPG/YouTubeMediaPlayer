import React, { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import {
  addNewCategory,
  deleteCategory,
  getAllCategories,
  updateCategoryData,
} from "../services/AllApi";
import { toast } from "react-toastify";
import "./Category.css";

function Category() {
  const [show, setShow] = useState(false);
  const [newCategoryAdded, setNewCategoryAdded] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [categoryName, setCategoryName] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [categoryDeleted, setCategoryDeleted] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showVideoDetails, setShowVideoDetails] = useState(false);

  const handleCloseVideoDetails = () => setShowVideoDetails(false);
  const addCategory = async () => {
    console.log(categoryName);
    const response = await addNewCategory({
      categoryName: categoryName,
      videos: [],
    });
    setNewCategoryAdded(!newCategoryAdded);
    handleClose();
  };

  const getCategories = async () => {
    const response = await getAllCategories();
    console.log(response.data);
    setCategoryData(response.data);
  };
  const handleDrop = async (e, categoryId) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    const categoryItem = JSON.parse(data);
    console.log(categoryItem);

    const updatedCategories = categoryData.map((category) => {
      if (categoryId === category.id) {
        return {
          ...category,
          videos: [...category.videos, categoryItem],
        };
      } else {
        return category;
      }
    });

    setCategoryData(updatedCategories);
    const categoryToUpdate = updatedCategories.find(
      (cat) => cat.id === categoryId
    );
    await updateCategoryData(categoryId, categoryToUpdate);
  };

  const deleteVideoCategory = async (categoryId) => {
    const response = await deleteCategory(categoryId);
    if (response.status == 200) {
      toast.success("Category Deleted!");
      setCategoryDeleted(!categoryDeleted);
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleShowVideoDetails = (video) => {
    setSelectedVideo(video);
    setShowVideoDetails(true);
  };

  useEffect(() => {
    getCategories();
  }, [newCategoryAdded, categoryDeleted]);
  return (
    <>
      <div className="container m-1">
        <button
          className="btn btn-warning"
          onClick={handleShow}
          style={{ width: "20rem" }}
        >
          Add category
        </button>
      </div>
      <div className="p-2 mt-3 ms-2">
        <div className="container text-center">
          <h5>Categories</h5>
        </div>

        {categoryData.length > 0 ? (
          categoryData?.map((category) => (
            <Dropdown
              onDrop={(e) => handleDrop(e, category.id)}
              onDragOver={handleDragOver}
              className="mt-2 mb-2"
              key={category.id}
            >
              <Dropdown.Toggle
                variant="light"
                id="dropdown-basic"
                style={{ width: "20rem" }}
                className="drop-down-toggle-custom"
              >
                <div className="container d-flex align-items-center p-3 justify-content-end ms-0 me-0">
                  <div className="container me-5 ms-0 mt-2">
                    <strong>{category?.categoryName}</strong>
                  </div>
                  <div className="container ms-5 me-0">
                    <button
                      onClick={() => {
                        deleteVideoCategory(category.id);
                      }}
                      className="btn btn-danger"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ width: "20rem" }}>
                {category.videos && category.videos.length > 0 ? (
                  category?.videos?.map((video) => (
                    <Dropdown.Item
                      href="#"
                      onClick={() => handleShowVideoDetails(video)}
                    >
                      <img
                        src={video.imageUrl}
                        style={{ width: "5rem", height: "5rem" }}
                      />
                      &nbsp;
                      {video?.caption}
                    </Dropdown.Item>
                  ))
                ) : (
                  <Dropdown.Item href="#/action-1">No Videos</Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          ))
        ) : (
          <p>No categories</p>
        )}
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="border-bottom-0">
          <Modal.Title>
            Add Category &nbsp; <i class="fa-solid fa-list"></i>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ fontWeight: "700" }}>Please fill the form</p>
          <Form className="border border-dark p-3 rounded">
            <Form.Group className="mb-3" controlId="formGroupVideoId">
              <Form.Control
                type="text"
                placeholder="Enter Category Name"
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="border-top-0">
          <Button variant="dark" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="warning" onClick={addCategory}>
            Add Category
          </Button>
        </Modal.Footer>
      </Modal>
      {selectedVideo && (
        <Modal
          show={showVideoDetails}
          onHide={handleCloseVideoDetails}
          centered
          size="md"
        >
          <Modal.Header closeButton>
            <Modal.Title>Video Details</Modal.Title>
          </Modal.Header>
          <Modal.Body className="mb-5 p-5">
            <div className="container">
              <div className="container text-center">
                <h5>{selectedVideo.caption}</h5>
              </div>
              <div className="container d-flex align-items-center justify-content-center">
                <iframe src={selectedVideo.youTubeLink} />
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}

export default Category;
