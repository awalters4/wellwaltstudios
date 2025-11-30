import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import WellWaltStudios from "./WellWaltStudios";
import Blog from "./Blog";
import LaunchKit from "./LaunchKit";
import Aurova from "./Aurova";
import BehindTheBuild from "./BehindTheBuild";
import Privacy from "./Privacy";
import Terms from "./Terms";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<WellWaltStudios />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/behind-the-build" element={<BehindTheBuild />} />
          <Route path="/products/launch-kit" element={<LaunchKit />} />
          <Route path="/projects/aurova" element={<Aurova />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
        <Analytics />
      </div>
    </Router>
  );
}

export default App;
