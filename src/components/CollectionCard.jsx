import React from "react";

const CollectionCard = ({ image, title, subtitle }) => {
  return (
    <div className="collection-card position-relative text-white">
      <img src={image} alt={title} className="img-fluid w-100" />
      <div className="collection-overlay d-flex flex-column justify-content-center">
        <h3 className="fw-bold section-title collectionBtn">{title}</h3>
        <p>{subtitle}</p>
        <button className="btn btn-custom btn-custom2 mt-2 rounded-0">
          EXPLORE
        </button>
      </div>
    </div>
  );
};

export default CollectionCard;
