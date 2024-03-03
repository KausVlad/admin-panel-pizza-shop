import { DeleteModal } from "./DeleteModal";
import { PizzaIngredientMenuDialog } from "./PizzaIngredientMenuDialog";
import { PizzaAttributesMenuDialog } from "./PizzaAttributesMenuDialog";
import { UniversalProductDetailsProps } from "./UniversalProductDetails.types";
import { usePizzaDetails } from "../../hooks/usePizzaDetails";

export function UniversalProductDetails({
  data,
  serverMutation,
  addOrEdit,
}: UniversalProductDetailsProps) {
  const {
    pizzaDetails,
    dialogRef,
    attributesDialogRef,
    handleInputChange,
    handleSubmit,
    handleDeleteIngredient,
    handleDeleteAttribute,
    toggleDialog,
    setPizzaDetails,
  } = usePizzaDetails({ data, serverMutation });

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
