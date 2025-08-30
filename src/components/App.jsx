import React, { useState, useEffect } from "react";
import { CartProvider } from "./CartContext";
import Home from "./Home";
import Navbar from "./Navbar";
import ProductsPage from "./ProductsPage";
import CartPage from "./CartPage";
import DescriptionPage from "./DescriptionPage";
import UnderConstruction from "./UnderConstruction";
import Footer from "./Footer";
import Login from "./Login";
import { supabase } from "../api/supabase";
import { fetchCategories } from "../api/categories"; 

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]); 

  
  useEffect(() => {
    checkAuthState();
    loadCategories(); 


    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAuthState = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setUser(session?.user || null);
  };

  const loadCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentPage("products");
  };

  const handleSearchSubmit = (searchValue) => {
    setSearchTerm(searchValue);
    setCurrentPage("products");
  };

  const handleNavigate = (page) => {
    if ((page === "cart" || page === "profile") && !user) {
      setCurrentPage("login");
      return;
    }

    if (page === "logout") {
      supabase.auth.signOut();
      setUser(null);
      setCurrentPage("home");
      return;
    }

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

  // Handle successful login
  const handleLoginSuccess = () => {
    setCurrentPage("home");
  };

  return (
    <CartProvider>
      <div className="App">
        <Navbar
          onCategorySelect={handleCategorySelect}
          onSearchSubmit={handleSearchSubmit}
          onNavigate={handleNavigate}
          user={user}
          categories={categories} // PASS CATEGORIES TO NAVBAR
        />

        {currentPage === "home" && (
          <Home
            onAboutUsClick={handleAboutUsClick}
            onShopNowClick={() => setCurrentPage("products")}
            user={user}
          />
        )}

        {currentPage === "login" && (
          <Login
            onBack={() => setCurrentPage("home")}
            onNavigate={handleNavigate}
            onLoginSuccess={handleLoginSuccess}
          />
        )}

        {currentPage === "products" && (
          <ProductsPage
            initialCategory={selectedCategory}
            initialSearchTerm={searchTerm}
            onProductClick={handleProductClick}
            user={user}
          />
        )}

        {currentPage === "description" && selectedProduct && (
          <DescriptionPage
            product={selectedProduct}
            onBack={handleBackFromDescription}
            user={user}
          />
        )}

        {currentPage === "cart" && (
          <CartPage 
            onContinueShopping={handleContinueShopping}
            user={user}
          />
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

        {currentPage !== "about" && currentPage !== "hero" && <Footer />}
      </div>
    </CartProvider>
  );
}

export default App;