import React from "react";
import logo from "../images/logo.png";

function Header() {
  return (
    <header className="header">
      <img
        src="https://images.unsplash.com/photo-1570073141869-2b9947394c95?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Jewelry background"
        className="header-bg"
      />

      <div className="header-overlay">
        <img src={logo} alt="Logo" className="logoImg" />
        <p>
          Discover our handcrafted accessories and shop the collection that
          celebrates India’s rich textile heritage.
        </p>
        <button className="shop-btn">SHOP NOW</button>
      </div>
    </header>
  );
}

export default Header;
