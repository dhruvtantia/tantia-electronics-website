import { Route, Routes } from "react-router-dom";
import PageShell from "./components/layout/PageShell";
import Home from "./pages/Home";
import Brands from "./pages/Brands";
import BrandDetail from "./pages/BrandDetail";
import Products from "./pages/Products";
import ProductCategory from "./pages/ProductCategory";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<PageShell />}>
        <Route index element={<Home />} />
        <Route path="brands" element={<Brands />} />
        <Route path="brands/:brandSlug" element={<BrandDetail />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:categorySlug" element={<ProductCategory />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
