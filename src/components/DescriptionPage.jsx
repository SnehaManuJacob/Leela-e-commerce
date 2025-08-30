import React, { useState } from "react";
import { useCart } from "./CartContext";

export default function DescriptionPage({ product, onBack }) {
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "");
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const { addToCart } = useCart();

  const parsePrice = (priceString) => {
    if (typeof priceString === "number") return priceString;
    return parseFloat(priceString.replace(/[₹$,]/g, ""));
  };

  const handleAddToBag = () => {
    setIsAdding(true);

    const productToAdd = {
      ...product,
      selectedColor,
      selectedSize,
      quantity: 1, // add one at a time
    };

    for (let i = 0; i < quantity; i++) {
      addToCart(productToAdd);
    }

    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  const handleBack = () => {
    if (onBack) onBack();
  };

  const currentPrice = parsePrice(product.price);
  const originalPrice = product.original_price
    ? parsePrice(product.original_price)
    : null;
  const discount = originalPrice
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    : 0;

  return (
    <div className="container py-4">
      <div className="row">
        {/* LEFT SIDE: Images */}
        <div className="col-lg-6">
          <button
            className="btn btn-link text-decoration-none p-0 mb-3"
            onClick={handleBack}
          >
            ← Back to Products
          </button>

          <div className="mb-3">
            <img
              src={
                product.images?.[selectedImage]?.image_url ||
                product.img ||
                "/placeholder.png"
              }
              alt={product.name}
              className="img-fluid w-100 rounded shadow-sm"
              style={{ maxHeight: "600px", objectFit: "cover" }}
            />
          </div>

          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="d-flex gap-2 overflow-auto">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image.image_url}
                  alt={`${product.name} ${index + 1}`}
                  className={`border rounded cursor-pointer ${
                    selectedImage === index
                      ? "border-primary border-2"
                      : "border-light"
                  }`}
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          )}
        </div>

        {/* RIGHT SIDE: Details */}
        <div className="col-lg-6 ps-lg-5">
          <h1 className="h2 mb-2 section-title">{product.name}</h1>
          <div className="price-section mb-3">
            <span className="h3 fw-bold me-3">₹{currentPrice.toFixed(0)}</span>
            {originalPrice && (
              <>
                <span className="text-muted text-decoration-line-through me-2">
                  ₹{originalPrice.toFixed(0)}
                </span>
                <span className="badge bg-success">{discount}% OFF</span>
              </>
            )}
          </div>

          <p className="text-muted mb-4" style={{ lineHeight: "1.6" }}>
            {product.description}
          </p>

          {/* Colors */}
          {product.colors?.length > 0 && (
            <div className="mb-4">
              <h6 className="mb-2">Color</h6>
              <div className="d-flex gap-2">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    className={`btn p-0 rounded-circle border-2 ${
                      selectedColor === color ? "border-dark" : "border-light"
                    }`}
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: color,
                      position: "relative",
                    }}
                    onClick={() => setSelectedColor(color)}
                    title={`Color ${index + 1}`}
                  >
                    {selectedColor === color && (
                      <span
                        className="position-absolute top-50 start-50 translate-middle"
                        style={{
                          color: color === "#FFFFFF" ? "#000" : "#fff",
                        }}
                      >
                        ✓
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {product.sizes?.length > 0 && (
            <div className="mb-4">
              <h6 className="mb-2">Size</h6>
              <div className="d-flex gap-2 flex-wrap">
                {product.sizes.map((size, index) => (
                  <button
                    key={index}
                    className={`btn btn-outline-dark ${
                      selectedSize === size ? "active" : ""
                    }`}
                    style={{ minWidth: "50px" }}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-4">
            <h6 className="mb-2">Quantity</h6>
            <div className="d-flex align-items-center">
              <button
                className="btn btn-outline-secondary"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span className="mx-3 fw-bold" style={{ minWidth: "30px" }}>
                {quantity}
              </span>
              <button
                className="btn btn-outline-secondary"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Bag */}
          <button
            className={`btn w-100 py-3 mb-4 fw-bold ${
              isAdding ? "btn-success" : "btn-custom"
            }`}
            onClick={handleAddToBag}
            disabled={isAdding}
          >
            {isAdding ? "✓ ADDED TO BAG" : "ADD TO BAG"}
          </button>

          {/* Product Details Section */}
          {product.details && (
            <div className="product-specs">
              <h6 className="mb-3">Product Details</h6>
              <div className="row g-0">
                {Object.entries(product.details).map(([key, value]) => (
                  <div key={key} className="col-12 border-bottom py-2">
                    <div className="row">
                      <div className="col-4">
                        <small className="text-muted text-capitalize">
                          {key}:
                        </small>
                      </div>
                      <div className="col-8">
                        <small className="fw-medium">{value}</small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Extras */}
          <div className="mt-4 pt-4 border-top">
            <div className="row text-center">
              <div className="col-4">
                <small className="text-muted">
                  <i className="fas fa-shipping-fast mb-1 d-block"></i>
                  Free Shipping <br /> over ₹500
                </small>
              </div>
              <div className="col-4">
                <small className="text-muted">
                  <i className="fas fa-undo mb-1 d-block"></i>
                  30 Day <br /> Returns
                </small>
              </div>
              <div className="col-4">
                <small className="text-muted">
                  <i className="fas fa-shield-alt mb-1 d-block"></i>
                  Secure <br /> Payment
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

