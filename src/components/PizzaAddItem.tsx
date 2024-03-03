import { useAddPizzaMutation } from "../store/pizzaShopApi/pizza.endpoints";
import { UniversalProductDetails } from "./ui/UniversalProductDetails";
import { PizzaDetailsType } from "./ui/UniversalProductDetails.types";

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
      <UniversalProductDetails
        serverMutation={serverMutationAddPizza}
        addOrEdit="add"
      />
    </>
  );
}
