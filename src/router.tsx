import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/ui/AppLayout";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [],
  },
]);
