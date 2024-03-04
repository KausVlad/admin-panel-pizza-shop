import { useAddPizzaMutation } from "../store/pizzaShopApi/pizza.endpoints";
import { UniversalProductPizzaDetails } from "./ui/UniversalProductPizzaDetails";
import { PizzaDetailsType } from "./ui/UniversalProductPizzaDetails.types";

export default function PizzaAddItem() {
  const [addPizza] = useAddPizzaMutation();

  const serverMutationAddPizza = async (pizzaDetails: PizzaDetailsType) => {
    try {
      await addPizza({
        ...pizzaDetails,
        ingredients: pizzaDetails.ingredients,
        pizzaAttributes: pizzaDetails.pizzaAttributes,
      }).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <UniversalProductPizzaDetails
        serverMutation={serverMutationAddPizza}
        addOrEdit="add"
      />
    </>
  );
}
