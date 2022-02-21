import React, { useState } from "react";
import { Form, InputGroup, Modal } from "react-bootstrap";
import ingredientStore from "../stores/ingredientStore";
import Fuse from "fuse.js";

const AddIngredientModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [ingredient, setIngredient] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const threshold = 0.01;

  const options = { includeScore: true, keys: ["name"] };
  const ingredientFuse = new Fuse(ingredientStore.ingredients, options);

  const handleClose = () => setIsOpen(false);
  const handleShow = () => setIsOpen(true);

  const handleImage = (event) => {
    setIngredient({
      ...ingredient,
      [event.target.name]: event.target.files[0],
    });
  };

  const handleChange = (event) => {
    setIngredient({ ...ingredient, [event.target.name]: event.target.value });
    if (event.target.name === "name") {
      setSuggestions(ingredientFuse.search(event.target.value));
      console.log("suggestions", suggestions[0].item.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    ingredientStore.addIngredient(ingredient, handleClose);
  };

  return (
    <>
      <button className="btn btn-outline-dark" onClick={handleShow}>
        Add Ingredient
      </button>
      <Modal show={isOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Ingredient</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <InputGroup className="my-3">
              <InputGroup.Text>Name</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Ingredient name here"
                name="name"
                onChange={handleChange}
              />
            </InputGroup>
            <>
              {suggestions.filter((ing) => ing.score < threshold).length >
                0 && <p>{"Already in the database:"}</p>}
              <p>
                {suggestions
                  .filter((ing) => ing.score < threshold)
                  .map((ingr) => ingr.item.name)
                  .join(",")}
              </p>
            </>
            <InputGroup className="my-3">
              <InputGroup.Text>Image</InputGroup.Text>
              <Form.Control type="file" name="image" onChange={handleImage} />
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

export default AddIngredientModal;
