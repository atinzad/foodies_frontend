import { makeAutoObservable } from "mobx";
import instance from "./instance";

const categories = [
  {
    _id: 1,
    name: "category 1",
    image: "https://i.imgur.com/2ZZfFQb.jpg",
  },
  {
    _id: 2,
    name: "category 2",
    image: "https://i.imgur.com/2ZZfFQb.jpg",
  },
  {
    _id: 3,
    name: "category 3",
    image: "https://i.imgur.com/2ZZfFQb.jpg",
  },
  {
    _id: 4,
    name: "category 4",
    image: "https://i.imgur.com/2ZZfFQb.jpg",
  },
  {
    _id: 5,
    name: "category 5",
    image: "https://i.imgur.com/2ZZfFQb.jpg",
  },
];

class CategoryStore {
  categories = [];

  constructor() {
    makeAutoObservable(this);
  }

  //? will modify it after backend
  addCategory = async (category, handleClose) => {
    try {
      const res = await instance.post("/category", category);
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
