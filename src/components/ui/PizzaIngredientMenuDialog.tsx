import { forwardRef, useState } from "react";
import { useGetIngredientsQuery } from "../../store/pizzaShopApi/ingredient.endpoints";
import { PizzaDetailsType } from "./UniversalProductDetails.types";

type PizzaIngredientMenuDialogProps = {
  toggleDialog: () => void;
  pizzaDetails: PizzaDetailsType;
  setPizzaDetails: React.Dispatch<React.SetStateAction<PizzaDetailsType>>;
};

export const PizzaIngredientMenuDialog = forwardRef<
  HTMLDialogElement,
  PizzaIngredientMenuDialogProps
>(({ toggleDialog, pizzaDetails, setPizzaDetails }, ref) => {
  const { data: pizzaAllIngredients } = useGetIngredientsQuery(null);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

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
        {["VEGETABLE", "MEAT", "SAUCE", "CHEESE"].map((group) => (
          <button
            type="button"
            key={group}
            onClick={() => setSelectedGroup(group)}
            style={{
              fontWeight: selectedGroup === group ? "bold" : "normal",
            }}
          >
            {group}
          </button>
        ))}
      </div>
      {selectedGroup && (
        <ul>
          {pizzaAllIngredients
            ? pizzaAllIngredients
                .filter(
                  (ingredient) =>
                    ingredient.ingredientGroup === selectedGroup &&
                    !pizzaDetails.ingredients.includes(
                      ingredient.ingredientName
                    )
                )
                .map((ingredient) => (
                  <li
                    key={ingredient.id}
                    onClick={() => {
                      setPizzaDetails((prevDetails) => ({
                        ...prevDetails,
                        ingredients: [
                          ...prevDetails.ingredients,
                          ingredient.ingredientName,
                        ],
                      }));
                    }}
                  >
                    {ingredient.ingredientName}
                  </li>
                ))
            : null}
        </ul>
      )}
    </dialog>
  );
});
