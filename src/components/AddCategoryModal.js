import React, { useState } from "react";
import { Form, InputGroup, Modal } from "react-bootstrap";
import categoryStore from "../stores/categoryStore";
import recipeStore from "../stores/recipeStore";

const AddCategoryModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState(null);

  const handleClose = () => setIsOpen(false);
  const handleShow = () => setIsOpen(true);

  const handleImage = (event) => {
    setCategory({ ...category, [event.target.name]: event.target.files[0] });
  };

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
              <Form.Control type="file" name="image" onChange={handleImage} />
            </InputGroup>
            <InputGroup className="my-3">
              <InputGroup.Text>Recipes</InputGroup.Text>
              <select className="form-select">
                <option selected value="">
                  Empty
                </option>
                {recipeStore.recipes
                  .filter((recipe) => !recipe.category)
                  .map((recipe) => (
                    <option>{recipe.name}</option>
                  ))}
              </select>
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
