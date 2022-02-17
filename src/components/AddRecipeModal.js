import React, { useState } from "react";
import { Form, InputGroup, Modal } from "react-bootstrap";
import categoryStore from "../stores/categoryStore";
import recipeStore from "../stores/recipeStore";

const AddRecipeModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [recipe, setRecipe] = useState(null);

  const handleClose = () => setIsOpen(false);
  const handleShow = () => setIsOpen(true);

  const handleImage = (event) => {
    setRecipe({ ...recipe, [event.target.name]: event.target.files[0] });
  };

  const handleChange = (event) =>
    setRecipe({ ...recipe, [event.target.name]: event.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    recipeStore.addRecipe(recipe, handleClose);
  };

  return (
    <>
      <button className="btn btn-outline-dark" onClick={handleShow}>
        Add Recipe
      </button>
      <Modal show={isOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Recipe</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <InputGroup className="my-3">
              <InputGroup.Text>Name</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Recipe name here"
                name="name"
                onChange={handleChange}
              />
            </InputGroup>
            <InputGroup className="my-3">
              <InputGroup.Text>Image</InputGroup.Text>
              <Form.Control type="file" name="image" onChange={handleImage} />
            </InputGroup>
            <InputGroup className="my-3">
              <InputGroup.Text>Category</InputGroup.Text>
              <Form.Select name="category" onChange={handleChange}>
                <option selected disabled>
                  Select Category
                </option>
                {categoryStore.categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </Form.Select>
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

export default AddRecipeModal;
