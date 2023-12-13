export type TPizzaData = {
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
