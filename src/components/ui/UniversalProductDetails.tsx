import { useEffect, useState } from "react";
import {
  PizzaData,
  PizzaDataMutation,
} from "../../store/pizzaShopApi/pizza.endpoints.types";
import {
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  MutationDefinition,
} from "@reduxjs/toolkit/query";
import {
  BaseQueryApi,
  QueryReturnValue,
} from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";

type UniversalProductDetailsProps = {
  data?: PizzaData | undefined;
  serverMutation?: MutationTrigger<
    MutationDefinition<
      PizzaDataMutation,
      (
        args: string | FetchArgs,
        api: BaseQueryApi,
        extraOptions: Record<string, unknown>
      ) => Promise<
        QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>
      >,
      "Test",
      PizzaData,
      "pizzaShopApi"
    >
  >;
};

export default function UniversalProductDetails({
  data,
  serverMutation,
}: UniversalProductDetailsProps) {
  const [pizzaDetails, setPizzaDetails] = useState({
    pizzaName: "",
    priceStandard: 0,
    weightStandard: 0,
    ingredients: "",
    pizzaAttributes: "",
    doughCrust: "",
    pizzaGroup: "",
  });

  useEffect(() => {
    if (data) {
      setPizzaDetails({
        pizzaName: data.pizzaName,
        ingredients: data?.ingredients
          .map((ingredient) => ingredient.ingredientName)
          .join(", "),
        pizzaAttributes: data?.pizzaAttributes
          .map((attribute) => attribute.attributeName)
          .join(", "),
        priceStandard: data.priceStandard,
        weightStandard: data.weightStandard,

        doughCrust: data.doughCrust,
        pizzaGroup: data.pizzaGroup,
      });
    }
  }, [data]);

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    console.log(id, value);
    setPizzaDetails((prevDetails) => ({
      ...prevDetails,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (serverMutation) {
      try {
        await serverMutation({
          ...pizzaDetails,
          ingredients: pizzaDetails.ingredients.split(", "),
          pizzaAttributes: pizzaDetails.pizzaAttributes.split(", "),
        }).unwrap();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {data ? (
          <>
            <label htmlFor="id">ID</label>
            <input type="text" id="id" disabled value={data?.id} />
            <label htmlFor="createdAt">Created</label>
            <input
              type="text"
              id="createdAt"
              disabled
              value={data?.createdAt}
            />
            <label htmlFor="updatedAt">Updated</label>
            <input
              type="text"
              id="updatedAt"
              disabled
              value={data?.updatedAt}
            />
          </>
        ) : null}
        <label htmlFor="pizzaName">Pizza Name</label>
        <input
          required
          type="text"
          id="pizzaName"
          value={pizzaDetails?.pizzaName}
          onChange={handleInputChange}
        />
        <label htmlFor="priceStandard">Price for standard</label>
        <input
          required
          type="number"
          id="priceStandard"
          value={pizzaDetails?.priceStandard}
          onChange={handleInputChange}
        />
        <label htmlFor="weightStandard">Weight for standard</label>
        <input
          required
          type="number"
          id="weightStandard"
          value={pizzaDetails?.weightStandard}
          onChange={handleInputChange}
        />
        <label htmlFor="doughCrust">Dough Crust</label>
        <label htmlFor="ingredients">Ingredients</label>
        <input
          required
          type="text"
          id="ingredients"
          value={pizzaDetails?.ingredients}
          onChange={handleInputChange}
        />
        <label htmlFor="doughCrust">Dough Crust</label>
        <label htmlFor="pizzaAttributes">Pizza Attributes</label>
        <input
          required
          type="text"
          id="pizzaAttributes"
          value={pizzaDetails?.pizzaAttributes}
          onChange={handleInputChange}
        />
        <label htmlFor="doughCrust">Dough Crust</label>
        <select
          required
          name="doughCrust"
          id="doughCrust"
          value={pizzaDetails.doughCrust}
          onChange={handleInputChange}
        >
          <option value="THIN">Thin</option>
          <option value="THICK_CRUST">Thick Crust</option>
          <option value="PHILADELPHIA">Philadelphia</option>
          <option value="HOT_DOG_CRUST">Hot Dog Crust</option>
        </select>
        <label htmlFor="pizzaGroup">Pizza Group</label>
        <select
          name="pizzaGroup"
          id="pizzaGroup"
          value={pizzaDetails.pizzaGroup}
          onChange={handleInputChange}
        >
          <option value="NOVELTIES">Novelty</option>
          <option value="HEROES">Heroes</option>
          <option value="WONDER">Wonder</option>
          <option value="FINEST">Finest</option>
          <option value="GOURMET">Gourmet</option>
        </select>
        {serverMutation ? <button type="submit">Submit</button> : null}
      </form>
    </>
  );
}
