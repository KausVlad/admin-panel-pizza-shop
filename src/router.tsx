import { createBrowserRouter } from "react-router-dom";
import { Pizzas } from "./components/pages/Pizzas";
import { RequireAuth } from "./components/RequireAuth";
import { AddPizza } from "./components/pages/AddPizza";
import { AppLayout } from "./components/ui/AppLayout";
import { Login } from "./components/pages/Login";
import { Pizza } from "./components/pages/Pizza";
import { Ingredients } from "./components/pages/Ingredients";

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
            element: <Pizza />,
          },
          {
            path: "ingredients",
            element: <Ingredients />,
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
