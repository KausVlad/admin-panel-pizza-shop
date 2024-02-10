import { useParams } from "react-router-dom";
import { useGetPizzaByNameQuery } from "../store/pizzaShopApi/pizza.endpoints";
import UniversalProductDetails from "./ui/UniversalProductDetails";

export default function PizzaDetails() {
  const { pizzaName: paramsPizzaName } = useParams();
  const { data, isLoading } = useGetPizzaByNameQuery(paramsPizzaName || "");

  console.log(data);

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  // };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <UniversalProductDetails data={data} addOrEdit="edit" />;
}
