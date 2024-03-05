// usePizzaDetails.tsx
import { useEffect, useRef, useState } from "react";
import {
  PizzaDetailsType,
  UniversalProductPizzaDetailsProps,
} from "../components/ui/UniversalProductPizzaDetails.types";
import { getConvertedPizzaData } from "../utils/getConvertedPizzaData";
import { toggleDialog } from "../utils/toggleDialog";

export const usePizzaDetails = ({
  data,
  serverMutation,
}: Omit<UniversalProductPizzaDetailsProps, "addOrEdit">) => {
  const [pizzaDetails, setPizzaDetails] = useState<PizzaDetailsType>({
    pizzaName: "",
    priceStandard: 0,
    weightStandard: 0,
    ingredients: [],
    pizzaAttributes: [],
    doughCrust: "",
    pizzaGroup: "",
  });

  const ingredientsDialogRef = useRef<HTMLDialogElement>(null);
  const attributesDialogRef = useRef<HTMLDialogElement>(null);

  const toggleIngredientsDialogRef = () => toggleDialog(ingredientsDialogRef);
  const toggleAttributesDialogRef = () => toggleDialog(attributesDialogRef);

  useEffect(() => {
    if (data) {
      setPizzaDetails((prevDetails) => ({
        ...prevDetails,
        ...getConvertedPizzaData(data),
      }));
    }
  }, [data]);

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    console.log(id, value);
    setPizzaDetails((prevDetails) => ({
      ...prevDetails,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (serverMutation) {
      serverMutation(pizzaDetails, data);
    }
  };

  const handleDeleteIngredient = (ingredient: string) => {
    const updatedIngredients = pizzaDetails.ingredients.filter(
      (item) => item !== ingredient
    );
    setPizzaDetails({
      ...pizzaDetails,
      ingredients: updatedIngredients,
    });
  };

  const handleDeleteAttribute = (attribute: string) => {
    const updatedAttributes = pizzaDetails.pizzaAttributes.filter(
      (item) => item !== attribute
    );
    setPizzaDetails({
      ...pizzaDetails,
      pizzaAttributes: updatedAttributes,
    });
  };

  return {
    pizzaDetails,
    ingredientsDialogRef,
    toggleIngredientsDialogRef,
    attributesDialogRef,
    toggleAttributesDialogRef,
    handleInputChange,
    handleSubmit,
    handleDeleteIngredient,
    handleDeleteAttribute,
    setPizzaDetails,
  };
};
