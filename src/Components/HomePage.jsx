import React from "react";
import Navbar from "./Navbar"
import Slide from "./Slide";
import Categories from "./Categories";
import Listings from "./Listings";
import Footer from "./Footer";

function HomePage() {
  return (
    <div>
      <Navbar />
      <Slide />
      <Categories />
      <Listings />
    </div>
  )
}

export default HomePage;