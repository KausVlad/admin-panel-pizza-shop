import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/ui/AppLayout";
import Pizzas from "./components/pages/Pizzas";
import PizzaDetails from "./components/PizzaDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "pizza",
        element: <Pizzas />,
      },
      {
        path: "pizza/:pizzaName",
        element: <PizzaDetails />,
      },
    ],
  },
]);
