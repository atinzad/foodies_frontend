import { observer } from "mobx-react";
import React from "react";
import { useParams } from "react-router-dom";
import recipeStore from "../stores/recipeStore";

const RecipeDetails = () => {
  const { recipeId } = useParams();
  console.log("recipeId", recipeId);
  const recipe = recipeStore.recipes.find((recipe) => recipe._id === recipeId);
  if (recipe == null) {
    return <p>Loading ...</p>;
  }
  console.log("object", recipe.ingredients);
  return (
    <>
      <div className="details-header">
        <h1 className="details-title">{recipe.name}</h1>
        <div className="details-img-darkness"></div>
        <img src={recipe.image} alt="" className="details-img" />
      </div>
      <div className="p-3 text-dark">
        {recipeStore.ge}
      </div>
    </>
  );
};

export default observer(RecipeDetails);
