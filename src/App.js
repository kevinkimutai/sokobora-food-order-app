import { React, useEffect } from "react";

import { Route, Routes } from "react-router-dom";

import { useDispatch } from "react-redux";

import "./App.css";
import { Navbar } from "./components";
import HomePage from "./pages/HomePage";
import CreateItemPage from "./pages/CreateItemPage";
import { getAllFoodItems } from "./utils/firebaseFunctions";
import { foodItemActions } from "./app/foodItemsSlice";

function App() {
  const dispatch = useDispatch();

  const fetchItems = async () => {
    try {
      await getAllFoodItems().then((data) => {
        dispatch(foodItemActions.save(data));
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchItems();

    return fetchItems;
  });

  return (
    <>
      <Navbar />
      <main className="main-section section__padding">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/createItem" element={<CreateItemPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
