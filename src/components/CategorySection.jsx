import React from "react";
import CategoryCard from "./CategoryCard";

const categories = [
  {
    image:
      "https://i.pinimg.com/1200x/53/c0/60/53c060235c0f26a4c2bfc24a75f62979.jpg",
    title: "Accesories",
  },
  {
    image:
      "https://i.pinimg.com/1200x/54/f7/eb/54f7ebba3580d751a07f383297650a35.jpg",
    title: "Hair",
  },
  {
    image:
      "https://i.pinimg.com/1200x/38/ac/9e/38ac9e23165cae6e758b5227c6326aff.jpg",
    title: "Storage",
  },
  {
    image:
      "https://i.pinimg.com/1200x/43/c5/58/43c558b490cea645392e4ca11bdfbe5c.jpg",
    title: "Earrings",
  },
  {
    image:
      "https://i.pinimg.com/1200x/1d/57/92/1d57921fbc6237b9e7932f9a24121ab6.jpg",
    title: "Necklaces",
  },
  {
    image:
      "https://i.pinimg.com/736x/04/c6/9b/04c69ba92da30901a962af4f50b72ac6.jpg",
    title: "Dresses",
  },
  {
    image:
      "https://i.pinimg.com/736x/4b/1c/b5/4b1cb50e7107d427b729b00a49b2b1b1.jpg",
    title: "Shirts",
  },
];

const CategoriesSection = () => {
  return (
    <section className="my-5">
      <h3
        className="text-center mb-4 section-title"
        style={{ "margin-bottom": "50px" }}
      >
        Find Things You'll Love
      </h3>

      <div
        id="categoriesCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="1800"
      >
        <div className="carousel-inner">
          {/* Chunk categories into slides of 5 each */}
          {categories
            .reduce((acc, curr, idx) => {
              if (idx % 5 === 0) acc.push([]);
              acc[acc.length - 1].push(curr);
              return acc;
            }, [])
            .map((group, i) => (
              <div
                className={`carousel-item ${i === 0 ? "active" : ""}`}
                key={i}
              >
                <div className="d-flex justify-content-center gap-4">
                  {group.map((cat, j) => (
                    <CategoryCard key={j} image={cat.image} title={cat.title} />
                  ))}
                </div>
              </div>
            ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#categoriesCarousel"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#categoriesCarousel"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
        </button>
      </div>
    </section>
  );
};

export default CategoriesSection;
