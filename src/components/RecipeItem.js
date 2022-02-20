import React from "react";
import { Link } from "react-router-dom";

const RecipeItem = ({ recipe }) => {
  return (
    <div className="col-md-3 col-sm-12 py-2">
      <Link
        to={`/recipes/${recipe._id}`}
        className="card overflow-hidden shadow-sm list--item"
      >
        <img src={recipe.image} alt="" />
        <div className="list--item-bg"></div>
        <p>{recipe.name}</p>
      </Link>
    </div>
  );
};

export default RecipeItem;
