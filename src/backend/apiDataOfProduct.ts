import { MyProductType } from '@/types/product.type';
import supabase from './supabase';

export async function getDataOfProduct() {
  const { data, error } = await supabase.from('DataOfProduct').select('*');
  if (error) {
    console.error(error);
    throw new Error('baker');
  }
  return data;
}

export async function insertNewProduct(newRow: { image: File })  {

  const imageName = `${Math.random()}-${newRow.image.name}`.replaceAll('/', '');
  const imagePath = `https://taqdpudyhenvaibczyar.supabase.co/storage/v1/object/public/baker1/${imageName}`;

  const { data: gg, error: ee } = await supabase.storage
    .from('baker1')
    .upload(imageName, newRow.image);

  if (ee) {
    console.error('Error uploading file:', ee);
    return;
  }

  const { data, error } = await supabase
    .from('DataOfProduct')
    .insert({ ...newRow, image: imagePath })
    .select();
  if (error) {
    console.error(error);
    throw new Error('Error inserting new product');
  }
  return data;
}
export async function deleteProduct(id: string) {
  // حذف الـ favorites أولاً
  const { error: favError } = await supabase
    .from('ProductFavorite')
    .delete()
    .eq('product_id', id);

  if (favError) {
    console.error('Error deleting favorites:', favError);
    throw new Error('Cannot delete favorites before deleting product');
  }

  // بعدها نحذف المنتج نفسه
  const { data, error } = await supabase
    .from('DataOfProduct')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Error deleting product');
  }
  return data;
}


export async function updateProduct(newData: {
  id: string;
  EditRow: Partial<MyProductType>;
}) {

  const { data, error } = await supabase
    .from('DataOfProduct')
    .update({ ...newData.EditRow })
    .eq('id', newData.id);
  if (error) {
    console.error(error);
    throw new Error('Error updating product');
  }
  return data;
}

export async function updateProductsInBulk(
  products: { id: string; updateData: MyProductType }[]
) {
  const updates = products.map((product) =>
    supabase
      .from('DataOfProduct')
      .update(product.updateData)
      .eq('id', product.id)
  );

  const results = await Promise.all(updates);
  const errors = results.filter((result) => result.error);

  if (errors.length > 0) {
    console.error(errors);
    throw new Error('Error updating some products');
  }

  return results.map((result) => result.data);
}
