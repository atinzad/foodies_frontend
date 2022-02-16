import React, { useState } from "react";
import { Form, InputGroup, Modal } from "react-bootstrap";
import categoryStore from "../stores/categoryStore";

const AddCategoryModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState(null);

  const handleClose = () => setIsOpen(false);
  const handleShow = () => setIsOpen(true);

  const handleChange = (event) =>
    setCategory({ ...category, [event.target.name]: event.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    categoryStore.addCategory(category, handleClose);
  };

  return (
    <>
      <button className="btn btn-outline-dark" onClick={handleShow}>
        Add Category
      </button>
      <Modal show={isOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <InputGroup className="my-3">
              <InputGroup.Text>Name</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Category name here"
                name="name"
                onChange={handleChange}
              />
            </InputGroup>
            <InputGroup className="my-3">
              <InputGroup.Text>Image</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Image path here"
                name="image"
                onChange={handleChange}
              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <button type="submit" className="btn btn-outline-dark">
              ADD
            </button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default AddCategoryModal;
