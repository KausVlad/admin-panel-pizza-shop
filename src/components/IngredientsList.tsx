import {
  useDeleteIngredientMutation,
  useGetIngredientsQuery,
} from "../store/pizzaShopApi/ingredient.endpoints";
import { DeleteModal } from "./ui/DeleteModal";

export const IngredientsList = () => {
  const { data } = useGetIngredientsQuery(null);
  const [deleteIngredient] = useDeleteIngredientMutation();
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
              <td>{ingredient.ingredientName}</td>
              <td>image WIP</td>
              <td>{ingredient.ingredientGroup}</td>
              <td>
                <DeleteModal
                  productName={ingredient.ingredientName}
                  deleteMutation={deleteIngredient}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
