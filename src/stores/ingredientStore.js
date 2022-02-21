import { makeAutoObservable } from "mobx";
import instance from "./instance";

class IngredientStore {
  ingredients = [];

  constructor() {
    makeAutoObservable(this);
  }

  addIngredient = async (ingredient, handleClose) => {
    try {
      const formData = new FormData();
      for (const key in ingredient) formData.append(key, ingredient[key]);

      const res = await instance.post("/ingredient", formData);
      const newIngredient = res.data.payload;
      this.ingredients = [...this.ingredients, newIngredient];
      if (handleClose) handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  getIngredient = async () => {
    const res = await instance.get("/ingredient");
    this.ingredients = res.data.payload;
  };
}

const ingredientStore = new IngredientStore();
ingredientStore.getIngredient();
export default ingredientStore;
