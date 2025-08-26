import React from "react";
import Hero from "./Hero";
import NewIn from "./NewIn";
import Collections from "./Collections";
import AboutUs from "./AboutUs";
import Quality from "./Quality";
import CategorySection from "./CategorySection";

function Home({ onAboutUsClick, onShopNowClick }) {
  return (
    <>
      <Hero onShopNowClick={onShopNowClick} />
      <CategorySection />
      <AboutUs onAboutUsClick={onAboutUsClick} />
      <NewIn />
      <Quality />
      <Collections />
    </>
  );
}

export default Home;
