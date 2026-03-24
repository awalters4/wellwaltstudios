import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import WellWaltStudios from "./WellWaltStudios";
import Blog from "./Blog";
import LaunchKit from "./LaunchKit";
import Aurova from "./Aurova";
import BehindTheBuild from "./BehindTheBuild";
import ArticlePage from "./ArticlePage";
import Privacy from "./Privacy";
import Terms from "./Terms";
import GypsySupport from "./GypsySupport";
import GypsyPrivacy from "./GypsyPrivacy";
import SpringSpecial2026 from "./SpringSpecial2026";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<WellWaltStudios />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/behind-the-build" element={<BehindTheBuild />} />
          <Route path="/behind-the-build/:slug" element={<ArticlePage />} />
          <Route path="/products/launch-kit" element={<LaunchKit />} />
          <Route path="/projects/aurova" element={<Aurova />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/gypsysupport" element={<GypsySupport />} />
          <Route path="/gypsyprivacy" element={<GypsyPrivacy />} />
          <Route path="/springspecial2026" element={<SpringSpecial2026 />} />
        </Routes>
        <Analytics />
      </div>
    </Router>
  );
}

export default App;
