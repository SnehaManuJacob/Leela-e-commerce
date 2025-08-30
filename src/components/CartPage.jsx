import React, { useState } from "react";
import { useCart } from "./CartContext";
import CartCard from "./CartCard";
import CheckoutModal from "./CheckoutModal"; // We'll create this next
import { supabase } from "../api/supabase";

export default function CartPage({ onContinueShopping }) {
  const { items, clearCart, getCartTotals, createOrder } = useCart();
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const totals = getCartTotals();
  const subtotal = parseFloat(totals.subtotal);
  const shipping = parseFloat(totals.shipping);
  let finalTotal = parseFloat(totals.total);

  const handleApplyDiscount = () => {
    const validCodes = {
      SAVE10: { type: "percentage", value: 10 },
      FLAT50: { type: "fixed", value: 50 },
      WELCOME: { type: "percentage", value: 15 },
    };

    if (validCodes[discountCode.toUpperCase()]) {
      const discount = validCodes[discountCode.toUpperCase()];
      setAppliedDiscount({ code: discountCode.toUpperCase(), ...discount });
    } else {
      alert("Invalid discount code");
      setAppliedDiscount(null);
    }
  };

  const getDiscountAmount = () => {
    if (!appliedDiscount) return 0;

    if (appliedDiscount.type === "percentage") {
      return (subtotal * appliedDiscount.value) / 100;
    } else {
      return Math.min(appliedDiscount.value, subtotal);
    }
  };

  const discountAmount = getDiscountAmount();
  finalTotal = Math.max(0, finalTotal - discountAmount);

  const handleCheckout = async (shippingData) => {
    setCheckoutLoading(true);
    try {
      // Get current user from Supabase
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error('❌ User auth error:', userError);
        throw new Error(`Authentication error: ${userError.message}`);
      }
      if (!user) {
        throw new Error("User not authenticated - please log in again");
      }
      console.log('✅ User authenticated:', user.id);

      // Create order in database
      console.log('📦 Creating order with shipping data:', shippingData);
      const order = await createOrder(user, shippingData);
      
      console.log('🎉 Order created successfully:', order);
      
      alert(`Order created successfully! Your order ID is: ${order.id}`);
      setShowCheckoutModal(false);
      
    } catch (error) {
      console.error('💥 Checkout process failed:', error);
      alert(`Error: ${error.message}. Please try again or contact support.`);
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <h2 className="mb-4 section-title">Your Cart is Empty</h2>
            <p className="text-muted mb-4">
              Looks like you haven't added any items to your cart yet.
            </p>
            <button
              className="btn btn-primary btn-custom"
              onClick={onContinueShopping}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container py-4">
        <div className="row">
          {/* Cart Items */}
          <div className="col-lg-8">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="mb-0 section-title">Shopping Cart</h2>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={clearCart}
              >
                Clear Cart
              </button>
            </div>

            {/* Cart Items List */}
            <div className="bg-white rounded p-3">
              {items.map((item, index) => (
                <CartCard key={`${item.id}-${item.selectedColor}-${item.selectedSize}-${index}`} item={item} />
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="mt-3">
              <button
                className="btn btn-custom btn-outline-primary"
                onClick={onContinueShopping}
              >
                ← Continue Shopping
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="col-lg-4 mt-4 mt-lg-0">
            <div className="bg-white rounded shadow-sm p-4 sticky-top">
              <h4 className="mb-4 section-title">Order Summary</h4>

              {/* Subtotal */}
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal ({totals.itemCount} items)</span>
                <span>₹{totals.subtotal}</span>
              </div>

              {/* Shipping */}
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-success">Free</span>
                  ) : (
                    `₹${totals.shipping}`
                  )}
                </span>
              </div>

              {/* Discount */}
              {appliedDiscount && (
                <div className="d-flex justify-content-between mb-2 text-success">
                  <span>Discount ({appliedDiscount.code})</span>
                  <span>-₹{discountAmount.toFixed(2)}</span>
                </div>
              )}

              <hr />

              {/* Total */}
              <div className="d-flex justify-content-between mb-4">
                <strong>Total</strong>
                <strong>₹{finalTotal.toFixed(2)}</strong>
              </div>

              {/* Discount Code */}
              <div className="mb-3">
                <label className="form-label small text-muted">
                  DISCOUNT CODE
                </label>
                <div className="d-flex">
                  <input
                    type="text"
                    className="form-control form-control-sm me-2"
                    placeholder="Enter code"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                  />
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={handleApplyDiscount}
                  >
                    Apply
                  </button>
                </div>
                {appliedDiscount && (
                  <small className="text-success">
                    ✓ Discount applied: {appliedDiscount.code}
                  </small>
                )}
              </div>

              {/* Checkout Button */}
              <button 
                className="btn btn-dark w-100 mb-3 btn-custom"
                onClick={() => setShowCheckoutModal(true)}
                disabled={checkoutLoading}
              >
                {checkoutLoading ? 'Processing...' : 'Checkout Now'}
              </button>

              {/* Free Shipping Notice */}
              {shipping > 0 && (
                <small className="text-muted text-center d-block">
                  Add ₹{(500 - subtotal).toFixed(2)} more for free shipping
                </small>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
  show={showCheckoutModal}
  onClose={() => setShowCheckoutModal(false)}
  onCheckout={handleCheckout} // This is the important part!
  loading={checkoutLoading}
  total={finalTotal}
/>
    </>
  );
}