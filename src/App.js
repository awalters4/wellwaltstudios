import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WellWaltStudios from "./WellWaltStudios";
import Blog from "./Blog";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<WellWaltStudios />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
