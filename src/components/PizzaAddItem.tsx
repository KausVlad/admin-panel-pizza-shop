import { useAddPizzaMutation } from "../store/pizzaShopApi/pizza.endpoints";
import UniversalProductDetails, {
  PizzaDetails,
} from "./ui/UniversalProductDetails";

export default function PizzaAddItem() {
  const [addPizza] = useAddPizzaMutation();

  const serverMutation = async (pizzaDetails: PizzaDetails) => {
    try {
      await addPizza({
        ...pizzaDetails,
        ingredients: pizzaDetails.ingredients.split(", "),
        pizzaAttributes: pizzaDetails.pizzaAttributes.split(", "),
      }).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <UniversalProductDetails serverMutation={serverMutation} />
    </>
  );
}
