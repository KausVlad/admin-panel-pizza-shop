import { forwardRef, useState } from "react";
import { useUpdateIngredientMutation } from "../../store/pizzaShopApi/ingredient.endpoints";

type EditIngredientNameDialogProps = {
  toggleDialog: () => void;
  ingredientName: string;
  ingredientId: number;
};
export const EditIngredientNameDialog = forwardRef<
  HTMLDialogElement,
  EditIngredientNameDialogProps
>(({ toggleDialog, ingredientId, ingredientName }, ref) => {
  const [updateIngredient] = useUpdateIngredientMutation();
  const [newIngredientName, setNewIngredientName] = useState(ingredientName);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (ingredientName === newIngredientName) {
      toggleDialog();
      return;
    }
    await updateIngredient({ ingredientId, newIngredientName });
    toggleDialog();
  };

  return (
    <dialog
      ref={ref}
      onClick={(e) => {
        if (e.currentTarget === e.target) {
          toggleDialog();
        }
      }}
    >
      <form onSubmit={handleSubmit}>
        <label htmlFor="ingredientName">Ingredient Name</label>
        <input
          type="text"
          id="ingredientName"
          value={newIngredientName}
          onChange={(e) => setNewIngredientName(e.target.value)}
        />
        <button type="submit">Submit</button>
        <button type="reset" onClick={toggleDialog}>
          Cancel
        </button>
      </form>
    </dialog>
  );
});
