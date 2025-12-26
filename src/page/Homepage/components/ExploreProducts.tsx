
import BoxBroduct from '@/components/boxProduct/BoxPoduct';
import ShowProduct from '@/components/ShowProduct';
import useRedux from '@/hooks/useRedux';

function ExploreProducts() {
  const { appSelector } = useRedux();
  const { Data } = appSelector((state) => state.product);

  return (
    <ShowProduct
      title="Explore Our Products"
      viewBecause="Our Products"
      noButton={false}
      buttonText="View All Products"
    >
      <div className="flex    flex-row  flex-wrap  gap-16  h-[650px]  overflow-hidden  justify-center items-center   ">
        {Data.map((data) => (
          <div key={data.id} className="">
            <BoxBroduct product={data} idItem={data.id} />
          </div>
        ))}
      </div>
    </ShowProduct>
  );
}

export default ExploreProducts;
