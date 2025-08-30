import { supabase } from './supabase';

// Fetch all products (for ProductsPage)
export const fetchProducts = async (category = "All", searchTerm = "") => {
  try {
    console.log("Fetching products from Supabase...");

    let query = supabase
      .from("products")
      .select(`
        *,
        category:categories (name)
      `)
      .order("created_at", { ascending: false });

    // ✅ Filter by category (if not All)
    if (category && category !== "All") {
      // category_id must match categories.id
      query = query.eq("category_id", category);
    }

    // ✅ Search filter
    if (searchTerm) {
      query = query.ilike("name", `%${searchTerm}%`);
    }

    const { data, error } = await query;

    if (error) throw error;

    // Normalize
    return data.map((product) => ({
      ...product,
      category: product.category?.name || "Uncategorized",
      price: Number(product.price) || 0,
      original_price: Number(product.original_price) || null,
      img: product.img || "",
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Fetch a single product with details + images (for DescriptionPage)
export const fetchProductById = async (productId) => {
  try {
    console.log(`Fetching product ${productId} details...`);

    // 1️⃣ Fetch product with category
    const { data: product, error: productError } = await supabase
      .from("products")
      .select(`
        *,
        category:categories (name)
      `)
      .eq("id", productId)
      .single();

    if (productError) throw productError;

    // 2️⃣ Fetch product_details
    const { data: details, error: detailsError } = await supabase
      .from("product_details")
      .select("*")
      .eq("product_id", productId)
      .single();

    if (detailsError && detailsError.code !== "PGRST116") {
      // ignore "no rows" error if details missing
      throw detailsError;
    }

    // 3️⃣ Fetch product_images
    const { data: images, error: imagesError } = await supabase
      .from("product_images")
      .select("*")
      .eq("product_id", productId);

    if (imagesError) throw imagesError;

    return {
      ...product,
      category: product.category?.name || "Uncategorized",
      details: details || {},
      images: images?.map((img) => img.image_url) || [],
    };
  } catch (error) {
    console.error("Error fetching product by id:", error);
    throw error;
  }
};
