// usePizzaDetails.tsx
import { useEffect, useRef, useState } from "react";
import {
  PizzaDetailsType,
  UniversalProductDetailsProps,
} from "../components/ui/UniversalProductDetails.types";
import { getConvertedPizzaData } from "../utils/getConvertedPizzaData";

export const usePizzaDetails = ({
  data,
  serverMutation,
}: Omit<UniversalProductDetailsProps, "addOrEdit">) => {
  const [pizzaDetails, setPizzaDetails] = useState<PizzaDetailsType>({
    pizzaName: "",
    priceStandard: 0,
    weightStandard: 0,
    ingredients: [],
    pizzaAttributes: [],
    doughCrust: "",
    pizzaGroup: "",
  });

  const dialogRef = useRef<HTMLDialogElement>(null);
  const attributesDialogRef = useRef<HTMLDialogElement>(null);

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

  function toggleDialog(ref: React.RefObject<HTMLDialogElement>) {
    if (!ref.current) {
      return;
    }
    ref.current.hasAttribute("open")
      ? ref.current.close()
      : ref.current.showModal();
  }

  return {
    pizzaDetails,
    dialogRef,
    attributesDialogRef,
    handleInputChange,
    handleSubmit,
    handleDeleteIngredient,
    handleDeleteAttribute,
    toggleDialog,
    setPizzaDetails,
  };
};
