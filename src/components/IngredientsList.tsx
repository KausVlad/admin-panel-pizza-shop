import { useGetIngredientsQuery } from "../store/pizzaShopApi/ingredient.endpoints";

export const IngredientsList = () => {
  const { data } = useGetIngredientsQuery(null);
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
            <tr>
              <td>{ingredient.id}</td>
              <td>{ingredient.ingredientName}</td>
              <td>image WIP</td>
              <td>{ingredient.ingredientGroup}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
