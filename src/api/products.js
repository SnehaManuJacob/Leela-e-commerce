// src/api/products.js
import { supabase } from './supabase';

export const fetchProducts = async () => {
  try {
    console.log('Fetching products from Supabase...');
    
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories (name)
      `)
      .order('created_at', { ascending: false });

    console.log('Supabase products response:', { data, error });

    if (error) {
      console.error('Supabase products error:', error);
      throw error;
    }
    
    console.log('Products data received:', data);
    
    // Transform data to include category name
    const transformedData = data.map(product => ({
      ...product,
      category: product.category?.name || 'Uncategorized'
    }));
    
    console.log('Transformed products:', transformedData);
    return transformedData;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};