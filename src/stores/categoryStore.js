import { makeAutoObservable } from "mobx";
import instance from "./instance";

class CategoryStore {
  categories = [];

  constructor() {
    makeAutoObservable(this);
  }

  //? will modify it after backend
  addCategory = async (category, handleClose) => {
    try {
      const formData = new FormData();
      for (const key in category) formData.append(key, category[key]);

      const res = await instance.post("/category", formData);
      const newCategory = res.data.payload;
      this.categories = [...this.categories, newCategory];
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  getCategory = async () => {
    const res = await instance.get("/category");
    this.categories = res.data.payload;
  };
}

const categoryStore = new CategoryStore();
categoryStore.getCategory();
export default categoryStore;
