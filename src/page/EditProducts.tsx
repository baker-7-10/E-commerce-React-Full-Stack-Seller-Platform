import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { MyProductType } from '@/types/product.type';
import useUpdateProduct from '@/hooks/useUpdateProduct';
import useRedux from '@/hooks/useRedux';
import { useNavigate } from 'react-router-dom';
import Input from '@/components/Input/Input';

const Gg = () => {
  const [sortBy, setSortBy] = useState<string>('From the latest');
  const { updateProductById, isLoading } = useUpdateProduct();
  const { appSelector } = useRedux();
  const { ProductToEdit } = appSelector((state) => state.UserData);
  const  navigate = useNavigate()

console.log(ProductToEdit);

  const { register, handleSubmit, reset } = useForm<MyProductType>();

  const onSubmit: SubmitHandler<MyProductType> = async (newRow) => {
    const EditRow: MyProductType = {
      ...newRow,
      price: Number(newRow.price),
      color: {
        color1: newRow.color1,
        color2: newRow.color2,
      },
      id: ProductToEdit.id,
      rating: {
        rate: 4.5,
        count: 89,
      },
      piecesRemaining: Number(newRow.piecesRemaining),
    };

    delete EditRow.color1;
    delete EditRow.color2;

    updateProductById({ id: ProductToEdit.id, EditRow });
    reset();
    navigate('/UserPage')
  };

  const colors: string[] = [
    'Red',
    'Green',
    'Blue',
    'Black',
    'Yellow',
    'Pink',
    'Purple',
    'Orange',
    'Brown',
    'Gray',
    'Cyan',
    'Magenta',
    'Lime',
    'Maroon',
    'Navy',
    'Olive',
    'Teal',
    'Violet',
    'Gold',
    'Silver',
    'Beige',
  ];

  return (
    <>
      <p className="text-center font-bold text-6xl mb-6">Edit Product</p>
      {isLoading && (
        <Stack sx={{ width: '70%' }} spacing={2} className="mb-4">
          <Alert severity="info">Updating product...</Alert>
        </Stack>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-9 flex flex-col gap-6 p-6 bg-white rounded-lg shadow-lg max-w-xl mx-auto"
      >
        <select
          {...register('category', { required: true })}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option>Woman’s Fashion</option>
          <option>Men’s Fashion</option>
          <option>Electronics</option>
          <option>Home & Lifestyle</option>
          <option>Medicine</option>
          <option>Sports & Outdoor</option>
          <option>Baby’s & Toys</option>
          <option>Groceries & Pets</option>
          <option>Health & Beauty</option>
        </select>

        <Input label="Description" register={register} name="description" />

        <Input
          label="Price"
          register={register}
          name="price"
          type="number"
          min={0}
          max={99999}
        />

        <Input label="Title" register={register} name="title" />

        <label>Color 1</label>
        <select {...register('color1')}>
          {colors.map((color) => (
            <option key={color} value={color.toLowerCase()}>
              {color}
            </option>
          ))}
        </select>

        <label>Color 2</label>
        <select {...register('color2')}>
          {colors.map((color) => (
            <option key={color} value={color.toLowerCase()}>
              {color}
            </option>
          ))}
        </select>

        <Input
          label="Pieces Remaining"
          register={register}
          name="piecesRemaining"
          type="number"
          min={0}
          max={99999}
        />

        <button
          disabled={isLoading}
          className="p-2 mt-4 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          type="submit"
        >
          {isLoading ? 'Posting...' : 'Post New Product'}
        </button>
      </form>
    </>
  );
};

export default Gg;
