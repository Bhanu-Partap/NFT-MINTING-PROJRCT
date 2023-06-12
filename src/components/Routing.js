import React from "react";
import Navbar  from "../components/Navbar";
import { BrowserRouter, Routes } from "react-router-dom";
// import Homepage from "../Pages/Homepage";
// import About from "../Pages/About";
// import Collection from "../Pages/Collection";

export default function Routing() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* <Route path="/" element={<Homepage />} /> */}
          {/* <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}
