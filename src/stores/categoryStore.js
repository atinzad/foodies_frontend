import { makeAutoObservable } from "mobx";

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
  constructor() {
    makeAutoObservable(this);
  }

  categories = categories;

  //? will modify it after backend
  addCategory = (category) => {
    category._id = this.categories[this.categories.length - 1]._id + 1;
    this.categories = [...this.categories, category];
    console.log(this.categories);
  };
}

const categoryStore = new CategoryStore();
export default categoryStore;
