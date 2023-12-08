import { Outlet } from "react-router-dom";
import LeftNav from "../LeftNav";
import { useGetPizzasQuery } from "../../store/pizzaApi/pizza.endpoints";

export default function AppLayout() {
  const { data, error, isLoading } = useGetPizzasQuery(null);
  console.log(data, error, isLoading);
  return (
    <div className="flex">
      <LeftNav />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
