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
      <div className="row">
        <div className="col-md-6 col-sm-12 p-3">
          <div className="p-3 card">
            <h4 className="mb-2">Description:</h4>
            <p>{recipe.description}</p>
          </div>
        </div>
        <div className="col-md-6 col-sm-12 p-3">
          <div className="p-3 card">
            <h4 className="mb-2">Ingredients:</h4>
            <ul>
              {recipeStore.getCompanion(recipe).map((ing) => (
                <li>{ing}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default observer(RecipeDetails);
