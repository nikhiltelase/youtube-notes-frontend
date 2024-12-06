import React from "react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/Home";

function App() {
  return (
    <div className="App">
      {/* Navbar component */}
      <Navbar />

      {/* Main content */}
      <main>
        <HomePage />
      </main>
    </div>
  );
}

export default App;
