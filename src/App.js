import React from "react";

import "./App.css";
import { Navbar } from "./components";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <Navbar />
      <main className="main-section">
        <HomePage />
      </main>
    </>
  );
}

export default App;
