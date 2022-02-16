import React from "react";
import { Link } from "react-router-dom";

const CategoryItem = ({ category }) => {
  return (
    <div className="col-md-3 col-sm-12 py-2">
      <Link
        to={`/categories/${category._id}`}
        className="card overflow-hidden shadow-sm list--item"
      >
        <img src={category.image} alt="" />
        <div className="list--item-bg"></div>
        <p>{category.name}</p>
      </Link>
    </div>
  );
};

export default CategoryItem;
