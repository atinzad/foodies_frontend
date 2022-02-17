import { observer } from "mobx-react";
import React from "react";
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

const Home = () => {
  const categoryList = categoryStore.categories
    .map((category) => <CategoryItem key={category._id} category={category} />)
    .sort(() => Math.random() - 0.5);

  const recipeList = recipeStore.recipes
    .map((recipe) => <RecipeItem key={recipe._id} recipe={recipe} />)
    .sort(() => Math.random() - 0.5);

  const ingredientList = ingredientStore.ingredients
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
          {categoryList.splice(0, 3)}
          {categoryList.length > 3 && (
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
          {recipeList.splice(0, 3)}
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
          {ingredientList.splice(0, 3)}
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
