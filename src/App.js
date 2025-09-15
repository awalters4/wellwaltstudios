import React from "react";
import WellWaltStudios from "./WellWaltStudios";

function App() {
  return (
    <div className="App">
      <WellWaltStudios
        siteName="Well Walt Studios"
        logo="/logo.png"
        heroImage="/me.jpg"
        githubLink="https://github.com/awells4"
        igLink="https://instagram.com/wellwaltstudios"
        resumeLink="/resume.pdf"
        acuityLink="YOUR_ACUITY_LINK_HERE"
      />
    </div>
  );
}

export default App;
