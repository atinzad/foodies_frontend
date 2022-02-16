import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import CategoryList from "./components/CategoryList";
import IngredientList from "./components/IngredientList";

function App() {
  return (
    <>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/ingredients" element={<IngredientList />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
