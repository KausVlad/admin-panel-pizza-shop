import { NavLink } from "react-router-dom";
import {
  useDeleteOtherProductMutation,
  useGetOtherProductsQuery,
} from "../store/pizzaShopApi/otherProducts.endpoints";
import { UniversalProductCell } from "./ui/UniversalProductCell";

export const ProductsList = () => {
  const { data, isLoading } = useGetOtherProductsQuery(null);
  const [deleteOtherProduct] = useDeleteOtherProductMutation();

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Image</th>
              <th>Price</th>
              <th>Weigh</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((product) => (
              <UniversalProductCell
                key={product.id}
                id={product.id}
                productName={product.productName}
                productImageUrl={product.productPhoto}
                portion={product.productSize[0]}
                price={product.productPrice[0]}
                rootProductPath="otherProducts"
                deleteMutation={deleteOtherProduct}
              />
            ))}
          </tbody>
        </table>
      )}
      <NavLink to="/product/add">Add new product</NavLink>
    </>
  );
};
