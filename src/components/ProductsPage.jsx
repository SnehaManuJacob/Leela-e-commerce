import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { products, categories } from "./Products";

export default function ProductsPage({
  initialCategory = "All",
  initialSearchTerm = "",
  onProductClick,
}) {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  useEffect(() => {
    let filtered = products;

    if (activeCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.category === activeCategory
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (product.desc &&
            product.desc.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredProducts(filtered);
  }, [activeCategory, searchTerm]);

  useEffect(() => {
    setActiveCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    setSearchTerm(initialSearchTerm);
  }, [initialSearchTerm]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleProductClick = (product) => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  return (
    <div className="container-fluid px-4 py-4">
      <div className="row mb-4">
        <div className="col-12">
          <h2 className="page-title mb-3 section-title">Our Products</h2>

          <div className="row align-items-center mb-4">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control customInput"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div className="col-md-6">
              <div className="d-flex justify-content-md-end justify-content-start mt-3 mt-md-0">
                <span className="me-3 align-self-center text-muted">
                  Filter by:
                </span>
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Category filters"
                >
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      className={`btn btn-sm ${
                        activeCategory === category
                          ? "btn-warning text-dark fw-bold"
                          : "btn-outline-secondary"
                      }`}
                      style={{
                        backgroundColor:
                          activeCategory === category
                            ? "#CC9544"
                            : "transparent",
                        borderColor:
                          activeCategory === category ? "#CC9544" : "#6c757d",
                        color: activeCategory === category ? "#000" : "#6c757d",
                      }}
                      onClick={() => handleCategoryChange(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {(activeCategory !== "All" || searchTerm) && (
            <div className="active-filters mb-3">
              <small className="text-muted">
                {searchTerm && `Searching for "${searchTerm}"`}
                {searchTerm && activeCategory !== "All" && " in "}
                {activeCategory !== "All" && `${activeCategory}`}
                {" • "}
                {filteredProducts.length} product
                {filteredProducts.length !== 1 ? "s" : ""} found
              </small>
              <button
                className="btn btn-link btn-sm text-decoration-none ms-2"
                onClick={() => {
                  setActiveCategory("All");
                  setSearchTerm("");
                }}
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <ProductCard
                product={product}
                onProductClick={() => handleProductClick(product)}
              />
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="text-center py-5">
              <h4 className="text-muted">No products found</h4>
              <p className="text-muted mb-3">
                Try adjusting your search terms or filters
              </p>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setActiveCategory("All");
                  setSearchTerm("");
                }}
              >
                View All Products
              </button>
            </div>
          </div>
        )}
      </div>

      {filteredProducts.length > 0 && (
        <div className="row mt-4">
          <div className="col-12 text-center">
            <small className="text-muted">
              Showing {filteredProducts.length} of {products.length} products
            </small>
          </div>
        </div>
      )}
    </div>
  );
}
