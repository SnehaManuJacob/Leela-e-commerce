import React from "react";

const QualityCard = ({ icon, title, description }) => {
  return (
    <div className="col-md-4 text-center mb-4">
      <div className="quality-card p-4 h-100">
        <div className="icon mb-3">
          <i className={`bi ${icon} fs-1 text-dark`}></i>
        </div>
        <h5 className="fw-bold mb-2">{title}</h5>
        <p className="text-muted small">{description}</p>
      </div>
    </div>
  );
};

export default QualityCard;
