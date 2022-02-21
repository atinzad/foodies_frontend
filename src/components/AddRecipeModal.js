import React, { useEffect, useState } from "react";
import { Form, InputGroup, Modal } from "react-bootstrap";
import categoryStore from "../stores/categoryStore";
import ingredientStore from "../stores/ingredientStore";
import recipeStore from "../stores/recipeStore";

const AddRecipeModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const [chosenIngredients, setChosenIngredients] = useState([]);

  const handleClose = () => setIsOpen(false);
  const handleShow = () => setIsOpen(true);

  const handleImage = (event) => {
    setRecipe({ ...recipe, [event.target.name]: event.target.files[0] });
  };

  const handleSelect = (event) => {
    setChosenIngredients([...chosenIngredients, event.target.value]);
  };

  const handleRemove = (ingredientId) => {
    setChosenIngredients(chosenIngredients.filter((id) => id !== ingredientId));
  };

  const handleChange = (event) =>
    setRecipe({ ...recipe, [event.target.name]: event.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("ing", chosenIngredients);
    // setRecipe({ ...recipe, ingredients: chosenIngredients.slice() });
    setChosenIngredients([]);
    recipeStore.addRecipe(recipe, handleClose);
    setRecipe(null);
  };

  useEffect(() => {
    setRecipe({ ...recipe, ingredients: chosenIngredients.slice() });
  }, [chosenIngredients]);

  console.log("recipe:", recipe);

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
                <option value="" selected disabled>
                  Select Category
                </option>
                <option value="">No Category</option>
                {categoryStore.categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </Form.Select>
            </InputGroup>
            <InputGroup className="my-3">
              <InputGroup.Text>Ingredients</InputGroup.Text>
              <Form.Select name="ingredient" onChange={handleSelect}>
                <option value="" selected>
                  Select ingredients
                </option>
                {ingredientStore.ingredients
                  .filter(
                    (ingredient) => !chosenIngredients.includes(ingredient._id)
                  )
                  .map((ingredient) => (
                    <option key={ingredient._id} value={ingredient._id}>
                      {ingredient.name}
                    </option>
                  ))}
              </Form.Select>
            </InputGroup>
            <div className="d-flex gap-3">
              {ingredientStore.ingredients
                .filter((ingredient) =>
                  chosenIngredients.includes(ingredient._id)
                )
                .map((ingredient) => (
                  <button
                    className="btn btn-primary"
                    key={ingredient._id}
                    onClick={() => handleRemove(ingredient._id)}
                  >
                    {ingredient.name}
                  </button>
                ))}
            </div>
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
