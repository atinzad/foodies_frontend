import { observer } from "mobx-react";
import React from "react";
import ingredientStore from "../stores/ingredientStore";
import AddIngredientModal from "./AddIngredientModal";
import IngredientItem from "./IngredientItem";

const IngredientList = () => {
  const ingredientList = ingredientStore.ingredients.map((ingredient) => (
    <IngredientItem key={ingredient._id} ingredient={ingredient} />
  ));
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center w-100 py-3">
        <h1 className="m-0">Ingredients</h1>
        <AddIngredientModal />
      </div>
      <div className="row">{ingredientList}</div>
    </div>
  );
};

export default observer(IngredientList);
