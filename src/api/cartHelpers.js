// api/cartHelpers.js
import { supabase } from './supabase';

/**
 * Get or create a cart for a user
 */
export const getOrCreateCart = async (userId) => {
  try {
    // First, try to get existing cart
    let { data: existingCart, error: fetchError } = await supabase
      .from('carts')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      throw fetchError;
    }

    if (existingCart) {
      return existingCart.id;
    }

    // Create new cart if none exists
    const { data: newCart, error: createError } = await supabase
      .from('carts')
      .insert([{ user_id: userId }])
      .select('id')
      .single();

    if (createError) throw createError;

    return newCart.id;
  } catch (error) {
    console.error('Error getting/creating cart:', error);
    throw error;
  }
};

/**
 * Load cart items for a user
 */
export const loadCartItems = async (userId) => {
  try {
    const cartId = await getOrCreateCart(userId);

    // Load cart items with product details
    const { data: cartItems, error } = await supabase
      .from('cart_items')
      .select(`
        *,
        products (
          id,
          name,
          description,
          price,
          img,
          colors
        )
      `)
      .eq('cart_id', cartId);

    if (error) throw error;

    return {
      cartId,
      items: cartItems || []
    };
  } catch (error) {
    console.error('Error loading cart items:', error);
    throw error;
  }
};

/**
 * Add item to cart
 */
export const addToCartDB = async (userId, productId, quantity = 1) => {
  try {
    const cartId = await getOrCreateCart(userId);

    const { error } = await supabase
      .from('cart_items')
      .upsert([
        {
          cart_id: cartId,
          product_id: productId,
          quantity: quantity,
        }
      ], {
        onConflict: 'cart_id,product_id'
      });

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

/**
 * Update cart item quantity
 */
export const updateCartItemDB = async (userId, productId, quantity) => {
  try {
    const cartId = await getOrCreateCart(userId);

    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      return await removeFromCartDB(userId, productId);
    }

    const { error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('cart_id', cartId)
      .eq('product_id', productId);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw error;
  }
};

/**
 * Remove item from cart
 */
export const removeFromCartDB = async (userId, productId) => {
  try {
    const cartId = await getOrCreateCart(userId);

    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('cart_id', cartId)
      .eq('product_id', productId);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};

/**
 * Clear all items from cart
 */
export const clearCartDB = async (userId) => {
  try {
    const cartId = await getOrCreateCart(userId);

    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('cart_id', cartId);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
};

/**
 * Get cart item count for a user
 */
export const getCartItemCount = async (userId) => {
  try {
    const cartId = await getOrCreateCart(userId);

    const { data, error } = await supabase
      .from('cart_items')
      .select('quantity')
      .eq('cart_id', cartId);

    if (error) throw error;

    const totalCount = data.reduce((total, item) => total + item.quantity, 0);
    return totalCount;
  } catch (error) {
    console.error('Error getting cart count:', error);
    return 0;
  }
};

/**
 * Transfer guest cart to user cart (for when user logs in)
 */
export const transferGuestCart = async (userId, guestCartItems) => {
  try {
    const cartId = await getOrCreateCart(userId);

    // First, get existing cart items to avoid duplicates
    const { data: existingItems, error: fetchError } = await supabase
      .from('cart_items')
      .select('product_id, quantity')
      .eq('cart_id', cartId);

    if (fetchError) throw fetchError;

    const existingItemsMap = new Map();
    existingItems?.forEach(item => {
      existingItemsMap.set(item.product_id, item.quantity);
    });

    // Prepare items to upsert
    const itemsToUpsert = guestCartItems.map(guestItem => {
      const existingQuantity = existingItemsMap.get(guestItem.id) || 0;
      return {
        cart_id: cartId,
        product_id: guestItem.id,
        quantity: existingQuantity + guestItem.quantity,
      };
    });

    if (itemsToUpsert.length > 0) {
      const { error } = await supabase
        .from('cart_items')
        .upsert(itemsToUpsert, {
          onConflict: 'cart_id,product_id'
        });

      if (error) throw error;
    }

    return { success: true };
  } catch (error) {
    console.error('Error transferring guest cart:', error);
    throw error;
  }
};
