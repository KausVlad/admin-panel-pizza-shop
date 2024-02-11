import { useAddPizzaMutation } from "../store/pizzaShopApi/pizza.endpoints";
import UniversalProductDetails, {
  PizzaDetailsType,
} from "./ui/UniversalProductDetails";

export default function PizzaAddItem() {
  const [addPizza] = useAddPizzaMutation();

  const serverMutationAddPizza = async (pizzaDetails: PizzaDetailsType) => {
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
      <UniversalProductDetails
        serverMutation={serverMutationAddPizza}
        addOrEdit="add"
      />
    </>
  );
}
