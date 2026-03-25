import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBaby,
  faBowlFood,
  faDisplay,
  faDumbbell,
  faHeadSideMask,
  faPerson,
  faPersonDress,
  faSyringe,
  faTent,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import ShowProduct from '@/ui/ShowProduct';


function CategorySales() {
  return (
    <ShowProduct
      title="Browse By Category"
      viewBecause="Categories"
      noTextAbout={true}
    >
      <div className="grid grid-cols-2  sm:grid-cols-3  md:grid-cols-4 gap-4">
        <CreateNaveLink name="Woman’s Fashion" icons={faPersonDress} />
        <CreateNaveLink name="Men’s Fashion" icons={faPerson} />
        <CreateNaveLink name="Electronics" icons={faDisplay} />
        <CreateNaveLink name="Home & Lifestyle" icons={faTent} />
        <CreateNaveLink name="Medicine" icons={faSyringe} />
        <CreateNaveLink name="Sports & Outdoor" icons={faDumbbell} />
        <CreateNaveLink name="Baby’s & Toys" icons={faBaby} />
        <CreateNaveLink name="Groceries & Pets" icons={faBowlFood} />
        <CreateNaveLink name="Health & Beauty" icons={faHeadSideMask} />
      </div>
    </ShowProduct>
  );
}

const CreateNaveLink = ({
  name,
  icons,
}: {
  name: string;
  icons: IconDefinition;
}) => {
  const navigate = useNavigate();
  const handleNav = () => {
    navigate(`/${name}`);
  };
  return (
    <div
      className=" cursor-pointer border-2 w-32 h-32 p-4 flex justify-center items-center flex-col gap-5   text-lg hover:bg-red-600  hover:text-white "
      onClick={() => handleNav()}
    >
      <FontAwesomeIcon icon={icons} />
      <p className=" text-sm text-center">{name}</p>
    </div>
  );
};

export default CategorySales;
