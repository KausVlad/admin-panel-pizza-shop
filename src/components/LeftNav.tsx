import { NavLink } from "react-router-dom";

export function LeftNav() {
  return (
    <>
      <NavLink to="/pizza">Pizza List</NavLink>
      <NavLink to="/ingredients">Ingredients List</NavLink>
      <NavLink to="/OtherProducts">Other Products</NavLink>
    </>
  );
}
