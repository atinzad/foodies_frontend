import { observer } from "mobx-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import categoryStore from "../stores/categoryStore";
import ingredientStore from "../stores/ingredientStore";
import AddCategoryModal from "./AddCategoryModal";
import AddRecipeModal from "./AddRecipeModal";
import AddIngredientModal from "./AddIngredientModal";
import CategoryItem from "./CategoryItem";
import RecipeItem from "./RecipeItem";
import IngredientItem from "./IngredientItem";
import recipeStore from "../stores/recipeStore";
import Fuse from "fuse.js";

const Home = () => {
  const [query, setQuery] = useState("des");

  const options = { includeScore: false, keys: ["name"] };
  const categoryFuse = new Fuse(categoryStore.categories, options);
  const categoryResult = query
    ? categoryFuse.search(query).map((item) => item.item)
    : categoryStore.categories;

  const recipeFuse = new Fuse(recipeStore.recipes, options);
  const recipeResult = query
    ? recipeFuse.search(query).map((item) => item.item)
    : recipeStore.recipes;

  const ingredientFuse = new Fuse(ingredientStore.ingredients, options);
  const ingredientResult = query
    ? ingredientFuse.search(query).map((item) => item.item)
    : ingredientStore.ingredients;

  const categoryList = categoryResult
    .map((category) => <CategoryItem key={category._id} category={category} />)
    .sort(() => Math.random() - 0.5);

  const recipeList = recipeResult
    .map((recipe) => <RecipeItem key={recipe._id} recipe={recipe} />)
    .sort(() => Math.random() - 0.5);

  const ingredientList = ingredientStore
    .map((ingredient) => (
      <ingredientItem key={ingredient._id} ingredient={ingredient} />
    ))
    .sort(() => Math.random() - 0.5);

  return (
    <>
      <div>
        <div className="d-flex justify-content-between align-items-center w-100 py-3">
          <h1 className="m-0">Categories</h1>
          <AddCategoryModal />
        </div>
        <div className="row">
          {categoryList.slice(0, 3)}
          {categoryList.length >= 3 && (
            <div className="col-md-3 col-sm-12 py-2">
              <Link
                to="/categories"
                className="card bg-light overflow-hidden shadow-sm list--item d-flex justify-content-center align-items-center h-100"
              >
                <span>Show All</span>
              </Link>
            </div>
          )}
        </div>
      </div>
      <hr className="my-4" />
      <div>
        <div className="d-flex justify-content-between align-items-center w-100 py-3">
          <h1 className="m-0">Recipes</h1>
          <AddRecipeModal />
        </div>
        <div className="row">
          {recipeList.slice(0, 3)}
          {recipeList.length > 3 && (
            <div className="col-md-3 col-sm-12 py-2">
              <Link
                to="/recipes"
                className="card bg-light overflow-hidden shadow-sm list--item d-flex justify-content-center align-items-center h-100"
              >
                <span>Show All</span>
              </Link>
            </div>
          )}
        </div>
      </div>
      <hr className="my-4" />
      <div>
        <div className="d-flex justify-content-between align-items-center w-100 py-3">
          <h1 className="m-0">Ingredients</h1>
          <AddIngredientModal />
        </div>
        <div className="row">
          {ingredientList.slice(0, 3)}
          {ingredientList.length > 3 && (
            <div className="col-md-3 col-sm-12 py-2">
              <Link
                to="/ingredients"
                className="card bg-light overflow-hidden shadow-sm list--item d-flex justify-content-center align-items-center h-100"
              >
                <span>Show All</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default observer(Home);
