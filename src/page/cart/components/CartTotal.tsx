import useRedux from '@/hooks/useRedux';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';

function CartTotal() {
  const { appSelector } = useRedux();

  const { totalPrice } = appSelector((state) => state.cartItem);
  
  

  return (
    <div className=" flex    items-center gap-10 mt-24  flex-col  sm:flex-row sm:justify-around">
      <div className=" flex gap-3 ">
        <input
          className=" border-black border-2 rounded-md w-[200px] h-[40px] p-1"
          type="text"
          placeholder="Coupon Code"
        />
        <Button textColor="text-white">Apply Coupon</Button>
      </div>
      <div className="w-[350px]  sm:w-[470px] h-[324px] border-[2px] border-black p-5">
        <h1 className="text-lg">Cart Total</h1>
        <div className="  flex  flex-col   gap-5">
          <p className=" border-b-2 p-2 flex justify-between">
            <span>Subtotal</span>
            <span>${totalPrice?.toFixed(2)}</span>
          </p>
          <p className=" border-b-2 p-2  flex justify-between">
            <span>Shipping</span>
            <span>Free</span>
          </p>

          <p className=" p-2   flex justify-between">
            <span>Total:</span>
            <span>${totalPrice?.toFixed(2)}</span>
          </p>
        </div>

        <div className="flex justify-center items-center mt-10">
          <Link
            to="/Checkout"
            className=" text-white bg-red-600 p-2  rounded-md"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartTotal;
