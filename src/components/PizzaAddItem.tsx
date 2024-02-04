import { useAddPizzaMutation } from "../store/pizzaShopApi/pizza.endpoints";
import UniversalProductDetails from "./ui/UniversalProductDetails";

export default function PizzaAddItem() {
  const [addPizza] = useAddPizzaMutation();

  return (
    <>
      <UniversalProductDetails serverMutation={addPizza} />
    </>
  );
}
