export type OtherProductsData = {
  id: number;
  productName: string;
  productPhoto: string;
  productSize: string[];
  productPrice: number[];
  productDescription: string;
  productGroup: EnumProductGroup;
  productSubGroup: string;
  createdAt: Date;
  updatedAt: Date;
};

export enum EnumProductGroup {
  Drink = "Drink",
  Sides = "Sides",
  Dessert = "Dessert",
}
