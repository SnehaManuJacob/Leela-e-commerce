import React from "react";

export default function UnderConstruction({ onContinueShopping }) {
  const handleContinueShopping = () => {
    if (onContinueShopping) {
      onContinueShopping();
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="text-center">

        <div className="mb-4">
          <div
            className="mx-auto rounded-circle bg-warning d-flex align-items-center justify-content-center"
            style={{ width: "120px", height: "120px" }}
          >
            <span style={{ fontSize: "2rem" }}>🚧</span>
          </div>
        </div>

        <h1 className="display-4 fw-bold mb-3 text-dark">Under Construction</h1>
        <p
          className="lead text-muted mb-4 mx-auto"
          style={{ maxWidth: "500px" }}
        >
          We're working hard to bring you something amazing! This page is
          currently under construction and will be available soon.
        </p>


        <p className="text-muted mb-5">
          Thank you for your patience as we build something special for you.
        </p>

        <button
          className="btn btn-custom btn-lg px-5 py-3 fw-bold text-uppercase"
          style={{
            backgroundColor: "#CC9544",
            borderColor: "#CC9544",
            color: "#000",
            letterSpacing: "1px",
          }}
          onClick={handleContinueShopping}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#B8843D";
            e.target.style.borderColor = "#B8843D";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#CC9544";
            e.target.style.borderColor = "#CC9544";
          }}
        >
          Continue Shopping
        </button>

        <div className="mt-5 pt-4">
          <div className="d-flex justify-content-center gap-3">
            <div
              className="bg-secondary rounded-circle"
              style={{ width: "8px", height: "8px", opacity: "0.3" }}
            ></div>
            <div
              className="rounded-circle"
              style={{
                width: "8px",
                height: "8px",
                backgroundColor: "#CC9544",
              }}
            ></div>
            <div
              className="bg-secondary rounded-circle"
              style={{ width: "8px", height: "8px", opacity: "0.3" }}
            ></div>
          </div>
        </div>
        <div className="mt-4">
          <span className="badge bg-light text-muted px-3 py-2 rounded-pill">
            Coming Soon
          </span>
        </div>
      </div>
    </div>
  );
}
