import { useNavigate, useParams } from "react-router-dom";
import {
  useGetPizzaByNameQuery,
  useUpdatePizzaMutation,
} from "../store/pizzaShopApi/pizza.endpoints";
import { UniversalProductPizzaDetails } from "./ui/UniversalProductPizzaDetails";
import { PizzaData } from "../store/pizzaShopApi/pizza.endpoints.types";
import { getPizzaDataMutationPartial } from "../utils/getPizzaDataMutationPartial";
import { PizzaDetailsType } from "./ui/UniversalProductPizzaDetails.types";

export function PizzaDetailsCard() {
  const { pizzaName: paramsPizzaName } = useParams();
  const { data, isLoading, isError } = useGetPizzaByNameQuery(
    paramsPizzaName || ""
  );
  const [updatePizza] = useUpdatePizzaMutation();
  const navigate = useNavigate();

  const serverMutationUpdate = async (
    pizzaDetails: PizzaDetailsType,
    data?: PizzaData
  ) => {
    if (data && paramsPizzaName) {
      const pizzaDataMutationPartial = getPizzaDataMutationPartial(
        pizzaDetails,
        data
      );

      if (Object.keys(pizzaDataMutationPartial).length > 0) {
        try {
          await updatePizza({
            pizzaName: paramsPizzaName,
            pizza: pizzaDataMutationPartial,
          }).unwrap();
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  if (isError) {
    navigate("/pizza");
    return null;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <UniversalProductPizzaDetails
      data={data}
      addOrEdit="edit"
      serverMutation={serverMutationUpdate}
    />
  );
}
