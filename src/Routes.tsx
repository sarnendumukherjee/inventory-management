import { Route, Routes } from "react-router-dom";
import Articles from "./pages/article/articles/Articles";
import ProductDetails from "./pages/product/product-details/ProductDetails";
import Products from "./pages/product/products/Products";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="products" element={<Products />} />
      <Route path="products/:productId" element={<ProductDetails />} />
      <Route path="articles" element={<Articles />} />
      <Route path="sales" element={<div>Sales page goes here</div>} />
    </Routes>
  );
};

export default AppRoutes;
