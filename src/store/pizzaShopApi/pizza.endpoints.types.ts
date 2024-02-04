export type PizzaData = {
  id: number;
  pizzaName: string;
  createdAt: string;
  updatedAt: string;
  size: string;
  weightStandard: number;
  priceStandard: number;
  doughCrust: string;
  pizzaGroup: string;
  ingredients: {
    id: number;
    ingredientName: string;
    ingredientGroup: string;
  }[];
  pizzaAttributes: {
    id: number;
    attributeName: string;
  }[];
};

export type PizzaDataMutation = {
  pizzaName: string;
  weightStandard: number;
  priceStandard: number;
  doughCrust: string;
  pizzaGroup: string;
  ingredients: {
    ingredientName: string;
  }[];
  pizzaAttributes: {
    attributeName: string;
  }[];
};
