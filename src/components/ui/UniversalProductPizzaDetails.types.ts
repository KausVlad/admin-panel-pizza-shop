import { PizzaData } from "../../store/pizzaShopApi/pizza.endpoints.types";

export type PizzaDetailsType = {
  pizzaName: string;
  priceStandard: number;
  weightStandard: number;
  ingredients: string[];
  pizzaAttributes: string[];
  doughCrust: string;
  pizzaGroup: string;
};

export type UniversalProductPizzaDetailsProps = {
  data?: PizzaData | undefined;
  serverMutation?: (pizzaDetails: PizzaDetailsType, data?: PizzaData) => void;
  addOrEdit: "add" | "edit";
};
