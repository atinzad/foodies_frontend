import { observer } from "mobx-react";
import React from "react";
import { Link } from "react-router-dom";
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
        <div className="row">
          {categoryList}
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
    </>
  );
};

export default observer(Home);
