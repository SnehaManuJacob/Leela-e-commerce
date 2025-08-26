import React, { useState } from "react";
import { useCart } from "./CartContext";

export default function Navbar({
  onCategorySelect,
  onSearchSubmit,
  onNavigate,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const { getCartTotals } = useCart();
  const { itemCount } = getCartTotals();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleCategoryClick = (category, e) => {
    e.preventDefault();
    setDropdownOpen(false); // Close dropdown
    if (onCategorySelect) {
      onCategorySelect(category);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit(searchValue);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  // Handle cart click
  const handleCartClick = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate("cart");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container-fluid px-4">
        {/* Logo on Left */}
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

        {/* Menu Items on Right */}
        <div
          className={`collapse navbar-collapse justify-content-end ${
            mobileMenuOpen ? "show" : ""
          }`}
          id="navMenu"
        >
          <ul className="navbar-nav align-items-center">
            {/* Dropdown */}
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
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={(e) => handleCategoryClick("All", e)}
                  >
                    All
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={(e) => handleCategoryClick("Hair", e)}
                  >
                    Hair
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={(e) => handleCategoryClick("Earrings", e)}
                  >
                    Earrings
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={(e) => handleCategoryClick("Necklaces", e)}
                  >
                    Necklaces
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={(e) => handleCategoryClick("Accesories", e)}
                  >
                    Accesories
                  </a>
                </li>
              </ul>
            </li>

            {/* Search */}
            <li className="nav-item mx-2">
              <form className="d-flex" onSubmit={handleSearchSubmit}>
                <input
                  className="form-control form-control-sm search-box customInput "
                  type="search"
                  placeholder="Search"
                  value={searchValue}
                  onChange={handleSearchChange}
                />
              </form>
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
