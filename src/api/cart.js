import { supabase } from './supabase';

export const cartAPI = {
  // Get user's cart
  getCart: async (userId) => {
    try {
      // First, get or create user's cart
      let { data: cart, error: cartError } = await supabase
        .from('carts')
        .select('id')
        .eq('user_id', userId)
        .single();

      if (cartError && cartError.code === 'PGRST116') { // No cart found
        const { data: newCart, error: createError } = await supabase
          .from('carts')
          .insert({ user_id: userId })
          .select('id')
          .single();
        
        if (createError) throw createError;
        cart = newCart;
      } else if (cartError) {
        throw cartError;
      }

      // Get cart items with product details
      const { data: cartItems, error: itemsError } = await supabase
        .from('cart_items')
        .select(`
          *,
          product:products (*)
        `)
        .eq('cart_id', cart.id);

      if (itemsError) throw itemsError;

      return cartItems.map(item => ({
        ...item.product,
        quantity: item.quantity,
        selectedColor: item.selected_color,
        selectedSize: item.selected_size,
        cartItemId: item.id
      }));

    } catch (error) {
      console.error('Error getting cart:', error);
      throw error;
    }
  },

  // Add to cart
  addToCart: async (userId, productId, quantity = 1, selectedColor = null, selectedSize = null) => {
    try {
      // Get user's cart
      let { data: cart, error: cartError } = await supabase
        .from('carts')
        .select('id')
        .eq('user_id', userId)
        .single();

      if (cartError && cartError.code === 'PGRST116') {
        const { data: newCart, error: createError } = await supabase
          .from('carts')
          .insert({ user_id: userId })
          .select('id')
          .single();
        
        if (createError) throw createError;
        cart = newCart;
      } else if (cartError) {
        throw cartError;
      }

      // Add item to cart
      const { data: cartItem, error: itemError } = await supabase
        .from('cart_items')
        .upsert({
          cart_id: cart.id,
          product_id: productId,
          quantity,
          selected_color: selectedColor,
          selected_size: selectedSize
        })
        .select(`
          *,
          product:products (*)
        `)
        .single();

      if (itemError) throw itemError;

      return {
        ...cartItem.product,
        quantity: cartItem.quantity,
        selectedColor: cartItem.selected_color,
        selectedSize: cartItem.selected_size,
        cartItemId: cartItem.id
      };

    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  },

  // Update quantity
  updateQuantity: async (cartItemId, quantity) => {
    try {
      const { data: cartItem, error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('id', cartItemId)
        .select(`
          *,
          product:products (*)
        `)
        .single();

      if (error) throw error;

      return {
        ...cartItem.product,
        quantity: cartItem.quantity,
        selectedColor: cartItem.selected_color,
        selectedSize: cartItem.selected_size,
        cartItemId: cartItem.id
      };

    } catch (error) {
      console.error('Error updating quantity:', error);
      throw error;
    }
  },

  // Remove from cart
  removeFromCart: async (cartItemId) => {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', cartItemId);

      if (error) throw error;
      return true;

    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  },

  // Clear cart
  clearCart: async (userId) => {
    try {
      const { data: cart, error: cartError } = await supabase
        .from('carts')
        .select('id')
        .eq('user_id', userId)
        .single();

      if (cartError) throw cartError;

      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('cart_id', cart.id);

      if (error) throw error;
      return true;

    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  }
};