import { useParams } from "react-router-dom";
import { useGetPizzaByNameQuery } from "../store/pizzaApi/pizza.endpoints";
import { useEffect, useState } from "react";

export default function PizzaDetails() {
  const { pizzaName: paramsPizzaName } = useParams();
  const { data, isLoading } = useGetPizzaByNameQuery(paramsPizzaName || "");
  const [pizzaDetails, setPizzaDetails] = useState({
    id: 0,
    pizzaName: "",
    priceStandard: 0,
    weightStandard: 0,
    doughCrust: "",
    pizzaGroup: "",
  });

  console.log(data);

  useEffect(() => {
    if (data) {
      setPizzaDetails({
        id: data.id,
        pizzaName: data.pizzaName,
        priceStandard: data.priceStandard,
        weightStandard: data.weightStandard,
        doughCrust: data.doughCrust,
        pizzaGroup: data.pizzaGroup,
      });
    }
  }, [data]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    console.log(id, value);
    setPizzaDetails((prevDetails) => ({
      ...prevDetails,
      [id]: value,
    }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <form action="">
      <label htmlFor="id">ID</label>
      <input type="text" id="id" disabled value={data?.id} />
      <label htmlFor="pizzaName">Pizza Name</label>
      <input
        type="text"
        id="pizzaName"
        value={pizzaDetails?.pizzaName}
        onChange={handleInputChange}
      />
      <label htmlFor="priceStandard">Price for standard</label>
      <input
        type="number"
        id="priceStandard"
        value={pizzaDetails?.priceStandard}
        onChange={handleInputChange}
      />
      <label htmlFor="weightStandard">Weight for standard</label>
      <input
        type="number"
        id="weightStandard"
        value={pizzaDetails?.weightStandard}
        onChange={handleInputChange}
      />
      <label htmlFor="doughCrust">Dough Crust</label>
      <select name="doughCrust" id="doughCrust">
        <option value="THIN">Thin</option>
        <option value="THICK_CRUST">Thick Crust</option>
        <option value="PHILADELPHIA">Philadelphia</option>
        <option value="HOT_DOG_CRUST">Hot Dog Crust</option>
      </select>
      <label htmlFor="pizzaGroup">Pizza Group</label>
      <select name="pizzaGroup" id="pizzaGroup">
        <option value="NOVELTIES">Novelty</option>
        <option value="HEROES">Heroes</option>
        <option value="WONDER">Wonder</option>
        <option value="FINEST">Finest</option>
        <option value="GOURMET">Gourmet</option>
      </select>
    </form>
  );
}
