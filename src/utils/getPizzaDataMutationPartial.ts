import { PizzaDetailsType } from "../components/ui/UniversalProductDetails";
import {
  PizzaData,
  PizzaDataMutationPartial,
} from "../store/pizzaShopApi/pizza.endpoints.types";
import { getConvertedPizzaData } from "./getConvertedPizzaData";

export const getPizzaDataMutationPartial = (
  pizzaDetails: PizzaDetailsType,
  data: PizzaData
) => {
  const convertedData: PizzaDetailsType = getConvertedPizzaData(data);
  let pizzaDataMutationPartial: PizzaDataMutationPartial = {};

  Object.keys(pizzaDetails).forEach((key) => {
    const value = pizzaDetails[key as keyof PizzaDetailsType];
    if (convertedData[key as keyof PizzaDetailsType] !== value) {
      let updatedValue: string | number | (string | number)[] = value;
      if (typeof value === "string" && key === "pizzaAttributes") {
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
