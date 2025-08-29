import React, { createContext, useContext, useReducer, useEffect } from "react";
import { supabase } from "../api/supabase";

const CartContext = createContext();

// Cart actions
const CART_ACTIONS = {
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  UPDATE_QUANTITY: "UPDATE_QUANTITY",
  CLEAR_CART: "CLEAR_CART",
  LOAD_CART: "LOAD_CART",
};

// Cart reducer
function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.LOAD_CART:
      return {
        ...state,
        items: action.payload || [],
      };

    case CART_ACTIONS.ADD_TO_CART:
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id && 
                 item.selectedColor === action.payload.selectedColor &&
                 item.selectedSize === action.payload.selectedSize
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id &&
            item.selectedColor === action.payload.selectedColor &&
            item.selectedSize === action.payload.selectedSize
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      } else {
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      }

    case CART_ACTIONS.REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter((item) => 
          !(item.id === action.payload.id &&
          item.selectedColor === action.payload.selectedColor &&
          item.selectedSize === action.payload.selectedSize)
        ),
      };

    case CART_ACTIONS.UPDATE_QUANTITY:
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => 
            !(item.id === action.payload.id &&
            item.selectedColor === action.payload.selectedColor &&
            item.selectedSize === action.payload.selectedSize)
          ),
        };
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id &&
          item.selectedColor === action.payload.selectedColor &&
          item.selectedSize === action.payload.selectedSize
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case CART_ACTIONS.CLEAR_CART:
      return {
        ...state,
        items: [],
      };

    default:
      return state;
  }
}

// Initial state
const initialState = {
  items: [],
};

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: CART_ACTIONS.LOAD_CART, payload: parsedCart });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  const parsePrice = (price) => {
    if (typeof price === 'number') return price;
    return parseFloat(String(price).replace(/[₹$,]/g, "")) || 0;
  };

  const addToCart = (product, quantity = 1, selectedColor = null, selectedSize = null) => {
    const cartItem = {
      ...product,
      quantity,
      selectedColor,
      selectedSize,
      addedAt: new Date().toISOString()
    };
    
    dispatch({ type: CART_ACTIONS.ADD_TO_CART, payload: cartItem });
  };

  const removeFromCart = (productId, selectedColor = null, selectedSize = null) => {
    dispatch({
      type: CART_ACTIONS.REMOVE_FROM_CART,
      payload: { id: productId, selectedColor, selectedSize },
    });
  };

  const updateQuantity = (productId, quantity, selectedColor = null, selectedSize = null) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { id: productId, quantity, selectedColor, selectedSize },
    });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
    localStorage.removeItem('cart');
  };

  const getCartTotals = () => {
    const subtotal = state.items.reduce((total, item) => {
      const price = parsePrice(item.price);
      return total + price * item.quantity;
    }, 0);

    const shipping = subtotal > 500 ? 0 : 50;
    const total = subtotal + shipping;
    const itemCount = state.items.reduce((count, item) => count + item.quantity, 0);

    return {
      subtotal: subtotal.toFixed(2),
      shipping: shipping.toFixed(2),
      total: total.toFixed(2),
      itemCount,
    };
  };

  // Create order in database
  const createOrder = async (user, shippingAddress = {}, paymentMethod = 'card') => {
    try {
      const totals = getCartTotals();
      const subtotal = parseFloat(totals.subtotal);
      
      const { data: order, error } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          status: 'pending',
          total: subtotal,
          shipping_address: shippingAddress,
          payment_method: paymentMethod,
          payment_status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;

      // Create order items
      const orderItems = state.items.map(item => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        price: parsePrice(item.price),
        selected_color: item.selectedColor,
        selected_size: item.selectedSize
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Clear cart after successful order creation
      clearCart();

      return order;

    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  const value = {
    items: state.items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotals,
    createOrder
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}