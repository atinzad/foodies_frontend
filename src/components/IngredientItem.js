import React from "react";
import { Link } from "react-router-dom";

const IngredientItem = ({ ingredient }) => {
  return (
    <div className="col-md-3 col-sm-12 py-2">
      <Link
        to={`/ingredient/${ingredient._id}`}
        className="card overflow-hidden shadow-sm list--item"
      >
        <img src={ingredient.image} alt="" />
        <div className="list--item-bg"></div>
        <p>{ingredient.name}</p>
      </Link>
    </div>
  );
};

export default IngredientItem;
