import { observer } from "mobx-react";
import React from "react";
import { useParams } from "react-router-dom";
import recipeStore from "../stores/recipeStore";
import AddRecipeModal from "./AddRecipeModal";
import RecipeItem from "./RecipeItem";

const RecipeList = () => {
  const { categoryId } = useParams();

  console.log(categoryId);

  const recipeList = !categoryId
    ? recipeStore.recipes.map((recipe) => (
        <RecipeItem key={recipe._id} recipe={recipe} />
      ))
    : recipeStore.recipes
        .filter((recipe) => recipe.category === categoryId)
        .map((recipe) => <RecipeItem key={recipe._id} recipe={recipe} />);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center w-100 py-3">
        <h1 className="m-0">Recipes</h1>
        <AddRecipeModal />
      </div>
      <div className="row">{recipeList}</div>
    </div>
  );
};

export default observer(RecipeList);
