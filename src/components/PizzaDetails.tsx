import { useParams } from "react-router-dom";
import {
  useGetPizzaByNameQuery,
  useUpdatePizzaMutation,
} from "../store/pizzaShopApi/pizza.endpoints";
import UniversalProductDetails, {
  PizzaDetailsType,
} from "./ui/UniversalProductDetails";
import { PizzaDataMutationPartial } from "../store/pizzaShopApi/pizza.endpoints.types";

export default function PizzaDetails() {
  const { pizzaName: paramsPizzaName } = useParams();
  const { data, isLoading } = useGetPizzaByNameQuery(paramsPizzaName || "");
  const [updatePizza] = useUpdatePizzaMutation();

  const serverMutationUpdate = async (pizzaDetails: PizzaDetailsType) => {
    if (data && paramsPizzaName) {
      const convertedData: PizzaDetailsType = {
        pizzaName: data.pizzaName,
        ingredients: data?.ingredients
          .map((ingredient) => ingredient.ingredientName)
          .join(", "),
        pizzaAttributes: data?.pizzaAttributes
          .map((attribute) => attribute.attributeName)
          .join(", "),
        priceStandard: data.priceStandard,
        weightStandard: data.weightStandard,
        doughCrust: data.doughCrust,
        pizzaGroup: data.pizzaGroup,
      };
      let pizzaDataMutationPartial: PizzaDataMutationPartial = {};

      Object.keys(pizzaDetails).forEach((key) => {
        const value = pizzaDetails[key as keyof PizzaDetailsType];
        if (convertedData[key as keyof PizzaDetailsType] !== value) {
          let updatedValue: string | number | (string | number)[] = value;
          if (
            typeof value === "string" &&
            (key === "ingredients" || key === "pizzaAttributes")
          ) {
            updatedValue = value.split(", ");
          }
          pizzaDataMutationPartial = {
            ...pizzaDataMutationPartial,
            [key]: updatedValue,
          };
        }
      });

      if (Object.keys(pizzaDataMutationPartial).length > 0) {
        try {
          await updatePizza({
            pizzaName: paramsPizzaName,
            pizza: pizzaDataMutationPartial,
          }).unwrap();
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <UniversalProductDetails
      data={data}
      addOrEdit="edit"
      serverMutation={serverMutationUpdate}
    />
  );
}
