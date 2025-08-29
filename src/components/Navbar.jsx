// Navbar.jsx
import React, { useState } from "react";
import { useCart } from "./CartContext";

export default function Navbar({
  onCategorySelect,
  onSearchSubmit,
  onNavigate,
  user
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const { getCartTotals } = useCart();
  const { itemCount } = getCartTotals();
  
  const isLoggedIn = !!user;

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleCategoryClick = (category, e) => {
    e.preventDefault();
    setDropdownOpen(false);
    if (onCategorySelect) onCategorySelect(category);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearchSubmit) onSearchSubmit(searchValue);
  };

  const handleSearchChange = (e) => setSearchValue(e.target.value);

  const handleLoginClick = (e) => {
    e.preventDefault();
    if (onNavigate) onNavigate(isLoggedIn ? "logout" : "login");
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    if (onNavigate) onNavigate("cart");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container-fluid px-4">
        {/* Logo */}
        <a
          className="navbar-brand logo"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (onNavigate) onNavigate("home");
          }}
        >
          LEELA'S
        </a>

        {/* Toggle for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMobileMenu}
          aria-controls="navMenu"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Right Menu */}
        <div
          className={`collapse navbar-collapse justify-content-end ${
            mobileMenuOpen ? "show" : ""
          }`}
          id="navMenu"
        >
          <ul className="navbar-nav align-items-center">
            {/* Category Dropdown */}
            <li className="nav-item dropdown mx-2">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="shopDropdown"
                role="button"
                onClick={toggleDropdown}
                aria-expanded={dropdownOpen}
              >
                Shop by Category
              </a>
              <ul
                className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}
                aria-labelledby="shopDropdown"
              >
                {["All", "Hair", "Clothing", "Jewelry", "Home"].map(
                  (cat) => (
                    <li key={cat}>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={(e) => handleCategoryClick(cat, e)}
                      >
                        {cat}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </li>

            {/* Search */}
            <li className="nav-item mx-2">
              <form className="d-flex" onSubmit={handleSearchSubmit}>
                <input
                  className="form-control form-control-sm search-box customInput"
                  type="search"
                  placeholder="Search"
                  value={searchValue}
                  onChange={handleSearchChange}
                />
              </form>
            </li>

            {/* Login/Logout */}
            <li className="nav-item mx-2">
              <a
                className="nav-link position-relative"
                href="#"
                onClick={handleLoginClick}
              >
                {isLoggedIn ? "Logout" : "Login"}
              </a>
            </li>

            {/* Cart */}
            <li className="nav-item mx-2">
              <a
                className="nav-link cart-link position-relative"
                href="#"
                onClick={handleCartClick}
              >
                🛒 Cart
                {itemCount > 0 && (
                  <span className="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle">
                    {itemCount}
                  </span>
                )}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}