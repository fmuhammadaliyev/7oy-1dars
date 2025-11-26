import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import CarDetail from "../pages/CarDetail";
import Edit from "../pages/Edit";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/edit/:id",
    element: <Edit />,
  },
  {
    path: "/car/:id",
    element: <CarDetail />,
  },
]);
