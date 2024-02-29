import { PizzaData } from "../store/pizzaShopApi/pizza.endpoints.types";

export const getConvertedPizzaData = (data: PizzaData) => {
  return {
    pizzaName: data.pizzaName,
    ingredients: data?.ingredients.map(
      (ingredient) => ingredient.ingredientName
    ),
    pizzaAttributes: data?.pizzaAttributes.map(
      (attribute) => attribute.attributeName
    ),
    priceStandard: data.priceStandard,
    weightStandard: data.weightStandard,
    doughCrust: data.doughCrust,
    pizzaGroup: data.pizzaGroup,
  };
};
