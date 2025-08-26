import React from "react";

const CategoryCard = ({ image, title }) => {
  return (
    <div className="text-center category-card">
      <div className="category-img-wrapper">
        <img src={image} alt={title} className="img-fluid rounded-circle" />
      </div>
      <p className="mt-2">{title}</p>
    </div>
  );
};

export default CategoryCard;
