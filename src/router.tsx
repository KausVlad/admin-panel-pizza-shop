import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/ui/AppLayout";
import Pizzas from "./components/pages/Pizzas";
import PizzaDetails from "./components/PizzaDetails";
import Login from "./components/pages/Login";

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
  {
    path: "/login",
    element: <Login />,
  },
]);
