import { MyProductType } from "@/types/product.type";
import supabase from "./supabase";

export async function insertProductFavorite({ userId, productId }: { userId: string; productId: string }):Promise<any> {
  const { data: existingData, error: checkError } = await supabase
    .from('ProductFavorite')
    .select('*')
    .eq('user_id', userId)
    .eq('product_id', productId);

  if (checkError) {
    console.error(checkError);

    throw new Error('Error checking existing product in favorites');
    return checkError
  }

  if (existingData && existingData.length > 0) {
    const { data, error } = await supabase
      .from('ProductFavorite')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId);

    if (error) {
      console.error(error);
      throw new Error('Error removing product from favorites');
    }

    return data; 
  } else {
    const { data, error } = await supabase
      .from('ProductFavorite')
      .insert([
        { user_id: userId, product_id: productId }
      ]);

    if (error) {
      console.error(error);
      throw new Error('Error inserting new product');
    }

    return data;
  }
}

export async function selectProductFavorite({ userId }: { userId: string }):Promise<any[]> {
  try {
    const { data: existingData, error: checkError } = await supabase
    .from('ProductFavorite')
    .select('DataOfProduct(*)') 
    .eq('user_id', userId);

    if (checkError) throw new Error(`Error retrieving favorites for user ${userId}: ${checkError.message}`);

    return existingData;
  } catch (error) {
    console.error(error);
    throw error; 
  }
}

