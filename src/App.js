import React from "react";

import { Route, Routes } from "react-router-dom";

import "./App.css";
import { Navbar } from "./components";
import HomePage from "./pages/HomePage";
import CreateItemPage from "./pages/CreateItemPage";

function App() {
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
