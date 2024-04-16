import { NavLink } from "react-router-dom";
import {
  useDeletePizzaMutation,
  useGetPizzasQuery,
} from "../store/pizzaShopApi/pizza.endpoints";
import { UniversalProductCell } from "./ui/UniversalProductCell";

export default function PizzasList() {
  const { data, isLoading } = useGetPizzasQuery(null);
  const [deletePizza] = useDeletePizzaMutation();

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
            {data?.map((pizza) => (
              <UniversalProductCell
                key={pizza.id}
                id={pizza.id}
                productName={pizza.pizzaName}
                productImage={"image(WIP)"}
                portion={pizza.weightStandard}
                price={pizza.priceStandard}
                rootProductPath="pizza"
                deleteMutation={deletePizza}
              />
            ))}
          </tbody>
        </table>
      )}
      <NavLink to="/pizza/add">Add new pizza</NavLink>
    </>
  );
}
