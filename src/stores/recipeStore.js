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
      const formData = new FormData();
      for (const key in recipe) formData.append(key, recipe[key]);

      const res = await instance.post(`/recipe/${recipe.category}`, formData);
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
}

const recipeStore = new RecipeStore();
recipeStore.getRecipe();
export default recipeStore;
