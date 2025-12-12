import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";  
import Home from "../pages/Home";
import Aksiya from "../pages/Aksiya";
import Menu from "../pages/Menu";
import Contact from "../pages/Contact";
import Branches from "../pages/Branches";
import Workers from "../pages/Workers";
import AboutUs from "../pages/AboutUs";
import Cart from "../pages/Cart";           

const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "aksiya", element: <Aksiya /> },
      { path: "menu", element: <Menu /> },
      { path: "contact", element: <Contact /> },
      { path: "branches", element: <Branches /> },
      { path: "workers", element: <Workers /> },
      { path: "about", element: <AboutUs /> },
      { path: "cart", element: <Cart /> },  
    ],
  },
]);

export default routes;