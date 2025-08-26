import React from "react";

export default function Hero({ onShopNowClick }) {
  const handleShopNowClick = () => {
    if (onShopNowClick) {
      onShopNowClick();
    }
  };
  return (
    <section className="hero container-fluid py-5">
      <div className="row align-items-stretch">
        <div className="col-md-6 p-0">
          <img
            src="https://plus.unsplash.com/premium_photo-1676751758731-6c0b1bdc57b0?q=80&w=687&auto=format&fit=crop"
            alt="Jewelry"
            className="hero-img"
          />
        </div>

        <div className="col-md-6 p-0 shopNow d-flex justify-content-end align-items-end section-2">
          <button className="shop-btn" onClick={handleShopNowClick}>
            SHOP NOW
          </button>
        </div>
      </div>
    </section>
  );
}
