import HomePage from "./components/home/HomePage";
import AboutPage from "./components/about/AboutPage";
import ProductListHandler from "./components/products/ProductListHandler";
import ProductManagment from "./components/products/ProductManagment";

const AppRoutes = [
  {
    index: true,
    element: <HomePage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/products",
    element: <ProductListHandler />,
  },
  {
    path: "/product/:productNumber",
    element: <ProductManagment />,
  },
  {
    path: "/product",
    element: <ProductManagment />,
  },
];

export default AppRoutes;
