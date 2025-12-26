
import BoxBroduct from '@/components/boxProduct/BoxPoduct';
import ShowProduct from '@/components/ShowProduct';
import useRedux from '@/hooks/useRedux';

function BestSellingProducts() {
  const { appSelector } = useRedux();
  const { BestSellingProducts } = appSelector((state) => state.product);

  return (
    <ShowProduct
      title="Best Selling Products"
      viewBecause="This Month"
      noButton={false}
      buttonText=""
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {BestSellingProducts.slice(0, 3).map((data) => (
          <div key={data.id}>
            <BoxBroduct product={data} idItem={data.id} />
          </div>
        ))}
      </div>
    </ShowProduct>
  );
}

export default BestSellingProducts;
