import { observer } from "mobx-react";
import React from "react";
import categoryStore from "../stores/categoryStore";
import AddCategoryModal from "./AddCategoryModal";
import CategoryItem from "./CategoryItem";

const Home = () => {
  const categoryList = categoryStore.categories
    .map((category) => <CategoryItem key={category._id} category={category} />)
    .sort(() => Math.random() - 0.5)
    .splice(0, 3);
  return (
    <>
      <div>
        <div className="d-flex justify-content-between align-items-center w-100 py-3">
          <h1 className="m-0">Categories</h1>
          <AddCategoryModal />
        </div>
        <div className="row">{categoryList}</div>
      </div>
      <hr className="my-4" />
    </>
  );
};

export default observer(Home);
