import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/ui/AppLayout";
import PizzaList from "./components/PizzaList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "pizza",
        element: <PizzaList />,
      },
    ],
  },
]);
