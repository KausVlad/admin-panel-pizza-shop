import { useRef, useState } from "react";
import { toggleDialog } from "../../utils/toggleDialog";
import { handleInputChangeObjectUseState } from "../../utils/handleInputChangeObjectUseState";
import { useAddIngredientMutation } from "../../store/pizzaShopApi/ingredient.endpoints";

export const AddIngredientDialog = () => {
  const ingredientDialogRef = useRef<HTMLDialogElement>(null);
  const toggleDialogRef = () => toggleDialog(ingredientDialogRef);
  const [ingredientDetails, setIngredientDetails] = useState({
    ingredientsName: "",
    ingredientGroup: "VEGETABLE",
  });
  const [addIngredient] = useAddIngredientMutation();

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) =>
    handleInputChangeObjectUseState<typeof ingredientDetails>(
      e,
      setIngredientDetails
    );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addIngredient({
      ingredientsName: ingredientDetails.ingredientsName.split(","),
      ingredientGroup: ingredientDetails.ingredientGroup,
    });
  };

  return (
    <>
      <button type="button" onClick={toggleDialogRef}>
        Add new Ingredient
      </button>
      <dialog
        ref={ingredientDialogRef}
        onClick={(e) => {
          if (e.currentTarget === e.target) {
            toggleDialogRef();
          }
        }}
      >
        <form onSubmit={handleSubmit}>
          <label htmlFor="ingredientsName">Ingredients Name</label>
          <input
            type="text"
            id="ingredientsName"
            onChange={handleInputChange}
            value={ingredientDetails.ingredientsName}
          />
          <label htmlFor="ingredientGroup">Ingredient Group</label>
          <select
            name="ingredientGroup"
            id="ingredientGroup"
            value={ingredientDetails.ingredientGroup}
            onChange={handleInputChange}
          >
            <option value="VEGETABLE">Vegetable</option>
            <option value="MEAT">Meat</option>
            <option value="SAUCE">Sauce</option>
            <option value="CHEESE">Cheese</option>
          </select>
          <button type="submit">Add</button>
        </form>
      </dialog>
    </>
  );
};
