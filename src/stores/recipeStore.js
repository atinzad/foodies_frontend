import { makeAutoObservable } from "mobx";
import categoryStore from "./categoryStore";
import ingredientStore from "./ingredientStore";
import instance from "./instance";

class RecipeStore {
  recipes = [];

  constructor() {
    makeAutoObservable(this);
  }

  //? will modify it after backend
  addRecipe = async (recipe, handleClose) => {
    try {
      if (recipe.category === "") {
        delete recipe.category;
      }
      const formData = new FormData();
      for (const key in recipe) formData.append(key, recipe[key]);
      const res = await instance.post(
        `/recipe/${recipe.category ? recipe.category : ""}`,
        formData
      );
      const newRecipe = res.data.payload;
      this.recipes = [...this.recipes, newRecipe];
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  getRecipe = async () => {
    const res = await instance.get("/recipe");
    this.recipes = res.data.payload;
  };

  getCompanions = () => {
    const newRecipes = this.recipes.map((recipe) => ({
      ...recipe,
      companion: this.getCompanion(recipe),
    }));

    //newRecipe.forEach(recipe => recipe.category ? recipe.companion.append(this.getCategory(recipe.category))
    return newRecipes;
  };

  getCategory = (id) => {
    return categoryStore.categories.find((category) => category._id === id);
  };

  getCompanion = (recipe) => {
    return recipe.ingredients
      ? recipe.ingredients.map((id) => this.getIngredient(id).name)
      : [];
  };

  getIngredient = (id) => {
    return ingredientStore.ingredients.find(
      (ingredient) => ingredient._id === id
    );
  };
}

const recipeStore = new RecipeStore();
recipeStore.getRecipe();
export default recipeStore;
