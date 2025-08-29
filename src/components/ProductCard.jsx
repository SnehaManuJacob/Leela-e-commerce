import React, { useState } from "react";
import { useCart } from "./CartContext";

export default function ProductCard({ product, onProductClick }) {
  if (!product) {
    return (
      <div className="card h-100 product-card">
        <div className="card-body d-flex align-items-center justify-content-center">
          <div className="text-muted">Loading...</div>
        </div>
      </div>
    );
  }

  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product);

    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  const handleProductClick = () => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  // Simplified price handling
  const currentPrice = typeof product.price === 'number' 
    ? product.price 
    : parseFloat(product.price) || 0;

  const originalPrice = product.original_price 
    ? (typeof product.original_price === 'number' 
        ? product.original_price 
        : parseFloat(product.original_price) || 0)
    : null;

  const discount = originalPrice && originalPrice > currentPrice
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    : 0;

  return (
    <div
      className="card product-card shadow-sm h-100 text-start position-relative"
      style={{ cursor: "pointer" }}
      onClick={handleProductClick}
    >
      <div className="position-relative overflow-hidden">
        <img
          src={product.img || '/placeholder-image.jpg'}
          className="card-img-top"
          alt={product.name || 'Product'}
          style={{
            height: "250px",
            objectFit: "cover",
            transition: "transform 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
          }}
          onError={(e) => {
            e.target.src = '/placeholder-image.jpg';
          }}
        />

        <div
          className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center opacity-0 bg-dark bg-opacity-25"
          style={{ transition: "opacity 0.3s ease" }}
          onMouseEnter={(e) => {
            e.target.style.opacity = "1";
          }}
          onMouseLeave={(e) => {
            e.target.style.opacity = "0";
          }}
        >
          <small className="text-white fw-bold">Click to view details</small>
        </div>
      </div>

      <div className="card-body text-start d-flex flex-column">
        <h6 className="product-name mb-1 fw-bold">{product.name || 'Unnamed Product'}</h6>
        {product.description && (
          <p
            className="product-desc text-muted small mb-2"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {product.description}
          </p>
        )}

        <div className="price-section mb-3">
          <span className="product-price fw-bold h6 mb-0 me-2">
            ₹{currentPrice.toFixed(0)}
          </span>
          {originalPrice && originalPrice > currentPrice && (
            <small className="text-muted text-decoration-line-through">
              ₹{originalPrice.toFixed(0)}
            </small>
          )}
        </div>

        {product.colors && product.colors.length > 0 && (
          <div className="mb-2">
            <div className="d-flex gap-1">
              {product.colors.slice(0, 4).map((color, index) => (
                <div
                  key={index}
                  className="rounded-circle border"
                  style={{
                    width: "15px",
                    height: "15px",
                    backgroundColor: color,
                  }}
                  title={`Color ${index + 1}`}
                />
              ))}
              {product.colors.length > 4 && (
                <small className="text-muted align-self-center ms-1">
                  +{product.colors.length - 4}
                </small>
              )}
            </div>
          </div>
        )}

        <button
          className={`btn w-100 mt-auto ${
            isAdding ? "btn-success" : "btn-outline-dark btn-custom"
          }`}
          onClick={handleAddToCart}
          disabled={isAdding}
        >
          {isAdding ? "✓ Added!" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}