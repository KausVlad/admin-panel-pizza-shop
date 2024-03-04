import { forwardRef } from "react";
import { PizzaDetailsType } from "./UniversalProductPizzaDetails.types";

type PizzaAttributesMenuDialogProps = {
  toggleDialog: () => void;
  pizzaDetails: PizzaDetailsType;
  setPizzaDetails: React.Dispatch<React.SetStateAction<PizzaDetailsType>>;
};

export const PizzaAttributesMenuDialog = forwardRef<
  HTMLDialogElement,
  PizzaAttributesMenuDialogProps
>(({ toggleDialog, setPizzaDetails, pizzaDetails }, ref) => {
  const pizzaAllAttributes = ["NEW", "CHEESE", "VEGETARIAN", "SPICY", "NONE"];
  return (
    <dialog
      ref={ref}
      onClick={(e) => {
        if (e.currentTarget === e.target) {
          toggleDialog();
        }
      }}
    >
      <button type="button" onClick={toggleDialog}>
        close
      </button>
      <div>
        {pizzaAllAttributes
          .filter(
            (attribute) => !pizzaDetails.pizzaAttributes.includes(attribute)
          )
          .map((attribute) => (
            <button
              type="button"
              key={attribute}
              onClick={() =>
                setPizzaDetails((prevDetails) => ({
                  ...prevDetails,
                  pizzaAttributes: [...prevDetails.pizzaAttributes, attribute],
                }))
              }
            >
              {attribute}
            </button>
          ))}
      </div>
    </dialog>
  );
});
