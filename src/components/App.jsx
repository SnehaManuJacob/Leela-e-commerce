import React, { useState } from "react";
import { CartProvider } from "./CartContext";
import Home from "./Home";
import Navbar from "./Navbar";
import ProductsPage from "./ProductsPage";
import CartPage from "./CartPage";
import DescriptionPage from "./DescriptionPage";
import UnderConstruction from "./UnderConstruction";
import Footer from "./Footer";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Handle category selection from navbar
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentPage("products");
  };

  const handleSearchSubmit = (searchValue) => {
    setSearchTerm(searchValue);
    setCurrentPage("products");
  };

  // Handle navigation
  const handleNavigate = (page) => {
    setCurrentPage(page);

    // Reset search/category when going to home
    if (page === "home") {
      setSelectedCategory("All");
      setSearchTerm("");
      setSelectedProduct(null);
    }
  };

  // Handle continue shopping from cart
  const handleContinueShopping = () => {
    setCurrentPage("products");
  };

  // Handle product click from products page
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setCurrentPage("description");
  };

  // Handle back from description page
  const handleBackFromDescription = () => {
    setSelectedProduct(null);
    setCurrentPage("products");
  };

  // Handle About Us navigation
  const handleAboutUsClick = () => {
    setCurrentPage("about");
  };

  // Handle continue shopping from under construction
  const handleContinueShoppingFromAbout = () => {
    setCurrentPage("home");
  };

  return (
    <CartProvider>
      <div className="App">
        <Navbar
          onCategorySelect={handleCategorySelect}
          onSearchSubmit={handleSearchSubmit}
          onNavigate={handleNavigate}
        />

        {currentPage === "home" && (
          <Home
            onAboutUsClick={handleAboutUsClick}
            onShopNowClick={() => setCurrentPage("products")}
          />
        )}

        {currentPage === "products" && (
          <ProductsPage
            initialCategory={selectedCategory}
            initialSearchTerm={searchTerm}
            onProductClick={handleProductClick}
          />
        )}

        {currentPage === "description" && selectedProduct && (
          <DescriptionPage
            product={selectedProduct}
            onBack={handleBackFromDescription}
          />
        )}

        {currentPage === "cart" && (
          <CartPage onContinueShopping={handleContinueShopping} />
        )}

        {currentPage === "about" && (
          <UnderConstruction
            onContinueShopping={handleContinueShoppingFromAbout}
          />
        )}

        {currentPage === "hero" && (
          <UnderConstruction
            onContinueShopping={handleContinueShoppingFromAbout}
          />
        )}

        {/* Footer - appears on all pages except under construction */}
        {currentPage !== "about" && currentPage !== "hero" && <Footer />}
      </div>
    </CartProvider>
  );
}

export default App;
