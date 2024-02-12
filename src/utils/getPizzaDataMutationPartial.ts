import { PizzaDetailsType } from "../components/ui/UniversalProductDetails";
import {
  PizzaData,
  PizzaDataMutationPartial,
} from "../store/pizzaShopApi/pizza.endpoints.types";

export const getPizzaDataMutationPartial = (
  pizzaDetails: PizzaDetailsType,
  data: PizzaData
) => {
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

  return pizzaDataMutationPartial;
};
