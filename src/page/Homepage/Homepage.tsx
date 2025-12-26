import RandomProduct from './components/RandomProduct';
import Sidebar from './components/Sidebar';
import FlachSales from './components/FlachSales';
import CategorySales from './components/CategorySales';
import BestSellingProducts from './components/BestSellingProducts';
import MusicBox from './components/MusicBox';
import ExploreProducts from './components/ExploreProducts';
import Information from './components/Information';
import { Link, NavLink } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import ButtonLink from '@/components/Link';

// import { useOnlineUser } from '@/hooks/useOnlineUser';
function Homepage() {
  return (
    <div className="flex flex-col gap-[500px] overflow-hidden">
  
      <div className="flex justify-center items-center gap-4   flex-col">
        <div
          className={`
         bg-black text-white font-bold  flex text-[3vw] sm:hidden w-full  p-2   items-center flex-row justify-around gap-2  cursor-pointer  `}
        >
          <NavLink
            to="/"
            className="border-current border-zinc-500   p-2 p-b-4  h-10   "
          >
            Home
          </NavLink>
          <NavLink
            to="Contact"
            className="border-current border-zinc-500  p-2 p-b-4  h-10  "
          >
            Contact
          </NavLink>
          <NavLink
            to="About"
            className="border-current border-zinc-500  p-2 p-b-4  h-10  "
          >
            About
          </NavLink>
          {/* <NavLink
            to="SignUp"
            className="border-current border-zinc-500  p-2 p-b-4  h-10  "
          >
            Sign Up
          </NavLink> */}
        </div>
        <Sidebar />
        <SearchBar />
        <RandomProduct />
      </div>
      <div className="flex justify-center items-center flex-col gap-[200px]">
       
        {/* <Link
  to="/AddNewProduct"
  className="fixed bottom-4 rounded-full w-12 h-1 p-8 text-sm  flex justify-center  items-center right-4 text-white bg-red-600  md:text-xl lg:text-2xl transition-all duration-300 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 z-[10000000]"
>
  Add+
</Link> */}

        <ButtonLink />
        <FlachSales />
        <CategorySales />
        <BestSellingProducts />
        <MusicBox />
        <ExploreProducts />
        <Information />
      </div>
    </div>
  );
}

export default Homepage;
