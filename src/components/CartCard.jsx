import React from "react";
import { useCart } from "./CartContext";

export default function CartCard({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  const parsePrice = (priceString) => {
    return parseFloat(priceString.replace(/[₹$,]/g, ""));
  };

  const price = parsePrice(item.price);
  const itemTotal = (price * item.quantity).toFixed(2);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(item.id);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  return (
    <div className="row border-bottom py-3 align-items-center cart-item">
      {/* Product Image */}
      <div className="col-md-2 col-3">
        <img
          src={item.img}
          alt={item.name}
          className="img-fluid rounded"
          style={{ maxHeight: "80px", objectFit: "cover" }}
        />
      </div>

      {/* Product Details */}
      <div className="col-md-4 col-9">
        <h6 className="mb-1 fw-bold">{item.name}</h6>
        {item.desc && (
          <small className="text-muted d-block mb-2">{item.desc}</small>
        )}
        <div className="text-muted small">Price: ₹{price.toFixed(2)}</div>
      </div>

      {/* Quantity Controls */}
      <div className="col-md-3 col-6 mt-2 mt-md-0">
        <div className="d-flex align-items-center">
          <button
            className="btn btn-outline-secondary btn-sm me-2"
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            -
          </button>
          <span className="mx-2 fw-bold">{item.quantity}</span>
          <button
            className="btn btn-outline-secondary btn-sm ms-2"
            onClick={() => handleQuantityChange(item.quantity + 1)}
          >
            +
          </button>
        </div>
        <small className="text-muted d-block mt-1">Quantity</small>
      </div>

      {/* Item Total & Remove */}
      <div className="col-md-2 col-6 mt-2 mt-md-0 text-end">
        <div className="fw-bold mb-2">₹{itemTotal}</div>
        <button
          className="btn btn-link text-danger btn-sm p-0 text-decoration-none"
          onClick={handleRemove}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
