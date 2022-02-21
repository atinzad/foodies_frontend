import { makeAutoObservable } from "mobx";
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
      console.log("newRecipe", newRecipe);
      this.recipes = [...this.recipes, newRecipe];
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  getRecipe = async () => {
    const res = await instance.get("/recipe");
    console.log("res in recipeStore", res.data.payload);
    this.recipes = res.data.payload;
  };
}

const recipeStore = new RecipeStore();
recipeStore.getRecipe();
export default recipeStore;
