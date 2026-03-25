import BoxBroduct from '@/ui/boxProduct/BoxPoduct';
import useRedux from '../../hooks/useRedux';
import { useParams } from 'react-router-dom';

function ViewByCategory() {
  const { categoryName } = useParams();
  const { appSelector } = useRedux();

  const { Data } = appSelector((state) => state.product);
  
  const categoryProuduct= Data.filter((e) => e.category === categoryName);
  
  return (
    <>
<h1 className="mt-24 mb-10 text-center text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text drop-shadow-md animate-fadeIn">
  {categoryName}
</h1>
    <div className="flex  flex-row  flex-wrap  gap-16 justify-evenly">
      {categoryProuduct.map((arr) => (
        <div key={arr.id}>
          <BoxBroduct product={arr} idItem={arr.id} />
        </div>
      ))}
    </div>
    </>
  
  );
}

export default ViewByCategory;
