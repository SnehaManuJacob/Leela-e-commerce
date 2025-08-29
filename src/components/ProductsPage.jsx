import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { fetchProducts } from "../api/products";
import { supabase } from "../api/supabase"; // Import supabase directly

export default function ProductsPage({
  initialCategory = "All",
  initialSearchTerm = "",
  onProductClick,
}) {
  const [products, setProducts] = useState([]); // backend products
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products on mount
  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProducts();
        console.log('Loaded products:', data); // Debug log
        setProducts(data);
      } catch (err) {
        console.error('Error loading products:', err);
        setError('Failed to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  // Apply filters
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
          product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (product.description &&
            product.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredProducts(filtered);
  }, [products, activeCategory, searchTerm]);

  const handleCategoryChange = (category) => setActiveCategory(category);
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Get unique categories from products for dynamic category buttons
  const categories = ['All', ...new Set(products.map(p => p.category).filter(Boolean))];

  return (
    <div className="container-fluid px-4 py-4">
      <h2 className="page-title mb-3 section-title">Our Products</h2>

      {/* Search + Filters */}
      <div className="row mb-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control customInput"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="col-md-6 text-end">
          <div className="btn-group">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`btn btn-sm ${
                  activeCategory === category
                    ? "btn-warning text-dark fw-bold"
                    : "btn-outline-secondary"
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h4 className="text-muted mt-3">Loading products...</h4>
        </div>
      )}

      {/* Products Grid */}
      {!loading && !error && (
        <div className="row">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                <ProductCard
                  product={product}
                  onProductClick={() => onProductClick && onProductClick(product)}
                />
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <h4 className="text-muted">No products found</h4>
              {searchTerm && (
                <p className="text-muted">
                  Try adjusting your search terms or browse all categories.
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
