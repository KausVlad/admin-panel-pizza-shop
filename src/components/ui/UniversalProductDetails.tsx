import { useEffect, useRef, useState } from "react";
import { PizzaData } from "../../store/pizzaShopApi/pizza.endpoints.types";
import { getConvertedPizzaData } from "../../utils/getConvertedPizzaData";
import { DeleteModal } from "./DeleteModal";
import { PizzaIngredientMenuDialog } from "./PizzaIngredientMenuDialog";
import { PizzaAttributesMenuDialog } from "./PizzaAttributesMenuDialog";

export type PizzaDetailsType = {
  pizzaName: string;
  priceStandard: number;
  weightStandard: number;
  ingredients: string[];
  pizzaAttributes: string[];
  doughCrust: string;
  pizzaGroup: string;
};

type UniversalProductDetailsProps = {
  data?: PizzaData | undefined;
  serverMutation?: (pizzaDetails: PizzaDetailsType, data?: PizzaData) => void;
  addOrEdit: "add" | "edit";
};

export function UniversalProductDetails({
  data,
  serverMutation,
  addOrEdit,
}: UniversalProductDetailsProps) {
  const [pizzaDetails, setPizzaDetails] = useState<PizzaDetailsType>({
    pizzaName: "",
    priceStandard: 0,
    weightStandard: 0,
    ingredients: [],
    pizzaAttributes: [],
    doughCrust: "",
    pizzaGroup: "",
  });

  const dialogRef = useRef<HTMLDialogElement>(null);
  const attributesDialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (data) {
      setPizzaDetails((prevDetails) => ({
        ...prevDetails,
        ...getConvertedPizzaData(data),
      }));
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
      serverMutation(pizzaDetails, data);
    }
  };

  const handleDeleteIngredient = (ingredient: string) => {
    const updatedIngredients = pizzaDetails.ingredients.filter(
      (item) => item !== ingredient
    );
    setPizzaDetails({
      ...pizzaDetails,
      ingredients: updatedIngredients,
    });
  };

  const handleDeleteAttribute = (attribute: string) => {
    const updatedAttributes = pizzaDetails.pizzaAttributes.filter(
      (item) => item !== attribute
    );
    setPizzaDetails({
      ...pizzaDetails,
      pizzaAttributes: updatedAttributes,
    });
  };

  function toggleDialog(ref: React.RefObject<HTMLDialogElement>) {
    if (!ref.current) {
      return;
    }
    ref.current.hasAttribute("open")
      ? ref.current.close()
      : ref.current.showModal();
  }

  console.log(pizzaDetails);

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
        <div>
          <label className="font-medium">Ingredients</label>
          {pizzaDetails.ingredients.map((ingredient, index) => (
            <div key={index}>
              <span onClick={() => toggleDialog(dialogRef)}>{ingredient}</span>
              <button
                type="button"
                onClick={() => handleDeleteIngredient(ingredient)}
              >
                Delete
              </button>
            </div>
          ))}
          <button type="button" onClick={() => toggleDialog(dialogRef)}>
            Add Ingredient
          </button>
          <PizzaIngredientMenuDialog
            ref={dialogRef}
            toggleDialog={() => toggleDialog(dialogRef)}
            pizzaDetails={pizzaDetails}
            setPizzaDetails={setPizzaDetails}
          />
        </div>

        <label className="font-medium">Pizza Attributes</label>
        {pizzaDetails.pizzaAttributes.map((attribute, index) => (
          <div key={index}>
            <span>{attribute}</span>
            <span onClick={() => handleDeleteAttribute(attribute)}>Delete</span>
          </div>
        ))}
        <button type="button" onClick={() => toggleDialog(attributesDialogRef)}>
          Add Attribute
        </button>
        <PizzaAttributesMenuDialog
          pizzaDetails={pizzaDetails}
          ref={attributesDialogRef}
          toggleDialog={() => toggleDialog(attributesDialogRef)}
          setPizzaDetails={setPizzaDetails}
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
        {serverMutation ? <button type="submit">{addOrEdit}</button> : null}
        {addOrEdit === "edit" ? (
          <DeleteModal productName={pizzaDetails.pizzaName} />
        ) : null}
      </form>
    </>
  );
}
