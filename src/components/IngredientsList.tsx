import { useRef } from "react";
import {
  useDeleteIngredientMutation,
  useGetIngredientsQuery,
} from "../store/pizzaShopApi/ingredient.endpoints";
import { DeleteModal } from "./ui/DeleteModal";
import { toggleDialog } from "../utils/toggleDialog";
import { EditIngredientNameDialog } from "./ui/EditIngredientNameDialog";
import { AddIngredientDialog } from "./ui/AddIngredientDialog";

export const IngredientsList = () => {
  const { data } = useGetIngredientsQuery(null);
  const [deleteIngredient] = useDeleteIngredientMutation();
  const ingredientDialogRefs = useRef<{ [key: string]: HTMLDialogElement }>({});
  const toggleIngredientDialog = (ingredientId: number) => {
    const ref = ingredientDialogRefs.current[ingredientId];
    if (ref) {
      toggleDialog(ref);
    }
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Group</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((ingredient) => (
            <tr key={ingredient.id}>
              <td>{ingredient.id}</td>
              <td>
                <span onClick={() => toggleIngredientDialog(ingredient.id)}>
                  {ingredient.ingredientName}
                </span>
                <EditIngredientNameDialog
                  ref={(ref) =>
                    ref && (ingredientDialogRefs.current[ingredient.id] = ref)
                  }
                  toggleDialog={() => toggleIngredientDialog(ingredient.id)}
                  ingredientId={ingredient.id}
                  ingredientName={ingredient.ingredientName}
                />
              </td>
              <td>image WIP</td>
              <td>{ingredient.ingredientGroup}</td>
              <td>
                <DeleteModal
                  productId={ingredient.id}
                  productName={ingredient.ingredientName}
                  deleteMutation={deleteIngredient}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddIngredientDialog />
    </>
  );
};
