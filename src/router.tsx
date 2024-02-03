import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/ui/AppLayout";
import Pizzas from "./components/pages/Pizzas";
import PizzaDetails from "./components/PizzaDetails";
import Login from "./components/pages/Login";
import RequireAuth from "./components/RequireAuth";
import AddPizza from "./components/pages/AddPizza";

export const router = createBrowserRouter([
  {
    element: <RequireAuth />,
    children: [
      {
        path: "/",
        element: <AppLayout />,
        children: [
          {
            path: "pizza",
            element: <Pizzas />,
          },
          {
            path: "pizza/add",
            element: <AddPizza />,
          },
          {
            path: "pizza/:pizzaName",
            element: <PizzaDetails />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
