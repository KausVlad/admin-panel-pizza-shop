import { useGetPizzasQuery } from "../store/pizzaShopApi/pizza.endpoints";
import UniversalProductCell from "./ui/UniversalProductCell";

export default function PizzaList() {
  const { data, error, isLoading } = useGetPizzasQuery(null);
  console.log(data, error, isLoading);

  return (
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
          />
        ))}
      </tbody>
    </table>
  );
}
