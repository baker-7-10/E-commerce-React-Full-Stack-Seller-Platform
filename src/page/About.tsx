import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLuggageCart,
  faMoneyBill,
  faStore,
} from '@fortawesome/free-solid-svg-icons';
import { faMoneyBillAlt } from '@fortawesome/free-solid-svg-icons/faMoneyBillAlt';
import BlackFridayImage from '@/assets/black-friday-elements-assortment_23-2149074075.png';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import ShowProduct from '@/components/ShowProduct';
import Information from './Homepage/components/Information';

const categories = [
  { name: 'Monthly Product Sale', icons: faMoneyBill },
  { name: 'Customers active on our site', icons: faLuggageCart },
  { name: 'Annual gross sale on our site', icons: faMoneyBillAlt },
  { name: 'Sellers active on our site', icons: faStore },
];

function About() {

 
  
  return (
    <div className="flex justify-center items-center flex-col gap-[150px] mt-12 container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <span className="max-w-96">
          <h1 className="text-[30px]">Our Story</h1>
          <p>
            Launched in 2015, Exclusive is South Asia’s premier online shopping
            marketplace with an active presence in Bangladesh. Supported by a
            wide range of tailored marketing, data, and service solutions,
            Exclusive has 10,500 sellers and 300 brands and serves 3 million
            customers across the region. Exclusive has more than 1 million
            products to offer, growing at a very fast pace. Exclusive offers a
            diverse assortment in categories ranging from consumer electronics
            to fashion.
          </p>
        </span>
        <img
          className="w-[500px]"
          src={BlackFridayImage}
          alt="Our Story Illustration"
        />
      </div>
      <ShowProduct
        title="Browse By Category"
        viewBecause="Categories"
        noTextAbout={false}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          {categories.map((category, index) => (
            <BoxCategory key={index} {...category} />
          ))}
        </div>
      </ShowProduct>
      <Information />
    </div>
  );
}

const BoxCategory = ({ name, icons }: { name: string; icons: IconProp }) => {
  return (
    <div className="cursor-pointer border-2  p-1 w-48 h-48 flex justify-center items-center flex-col gap-5 bg-gradient-to-br from-gray-50 via-white to-gray-100 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out rounded-lg group">
      <div className="w-16 h-16 flex justify-center items-center bg-red-500 text-white rounded-full group-hover:animate-bounce">
        <FontAwesomeIcon icon={icons} className="w-8 h-8" />
      </div>
      <p className="text-lg font-semibold text-gray-700 group-hover:text-red-600 transition-all duration-300">
        {name}
      </p>
    </div>
  );
};

export default About;
