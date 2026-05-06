import { Route, Routes } from "react-router-dom";
import PageShell from "./components/layout/PageShell";
import RouteTracker from "./components/common/RouteTracker";
import ScrollToTop from "./components/common/ScrollToTop";
import Home from "./pages/Home";
import Brands from "./pages/Brands";
import BrandDetail from "./pages/BrandDetail";
import Products from "./pages/Products";
import ProductCategory from "./pages/ProductCategory";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <>
      <RouteTracker />
      <ScrollToTop />
      <Routes>
        <Route element={<PageShell />}>
          <Route index element={<Home />} />
          <Route path="brands" element={<Brands />} />
          <Route path="brands/:brandSlug" element={<BrandDetail />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:categorySlug" element={<ProductCategory />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-of-service" element={<TermsOfService />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
