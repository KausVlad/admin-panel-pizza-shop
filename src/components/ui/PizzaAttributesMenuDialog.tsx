import { forwardRef } from "react";

type PizzaAttributesMenuDialogProps = {
  toggleDialog: () => void;
};

export const PizzaAttributesMenuDialog = forwardRef<
  HTMLDialogElement,
  PizzaAttributesMenuDialogProps
>(({ toggleDialog }, ref) => {
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
      <div></div>
    </dialog>
  );
});
