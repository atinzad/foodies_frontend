import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import CategoryList from "./components/CategoryList";
import RecipeList from "./components/RecipeList";

function App() {
  return (
    <>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/recipes" element={<RecipeList />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
