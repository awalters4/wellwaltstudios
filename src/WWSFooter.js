import React from "react";
import logo from "./well-walt-logo.png";

const WWSFooter = () => {
  return (
    <footer className="bg-gray-900 py-6 text-center text-gray-200 text-sm font-mono">
      <div className="flex flex-col items-center justify-center gap-1">
        <img src={logo} alt="Well Walt Studios Logo" className="h-8" />
        <p className="font-bold text-gray-200">
          👩🏽‍💻 A creation by Well Walt Studios
        </p>
        <p className="text-xs text-gray-400">Building apps that build people ✨</p>
      </div>
    </footer>
  );
};

export default WWSFooter;
