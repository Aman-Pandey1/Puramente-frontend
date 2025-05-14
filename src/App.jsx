import Shopall from "./component/pages/shopall";
import Contactus from "./component/pages/contactus";
import Sign2 from "./component/pages/sign2";
import Home from "./component/pages/home";
import SubCategoryPage from "./component/product cart/subcategory";
import Login2 from "./component/pages/login2";
import Checkout from "../src/component/newcomponent/checkout";
import { CartProvider } from "./component/newcomponent/cartcontext";
import Fairtradepage from "./component/pages/fairtradepage";
import Aboutus from "./component/pages/aboutus";
import Layout from "./component/layout/layout";
import Profile from "./component/pages/profile";
import AddProduct from "./component/admin/component/addproduct";
import OrderList from "./component/admin/component/orderlist";
import AdminProductList from "./component/admin/component/adminproductlist";
import AdminUserView from "./component/admin/component/adminusersview";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Adminhome from "./component/admin/component/adminhome";
import SingleProduct from "./component/product cart/singleproduct";
import Faqsection from "./component/newcomponent/faq";
import Category from "./component/pages/category";
import VisitJaipur from "./component/newcomponent/visitjaipur";
import Categorycart from "./component/product cart/categorycart";
import ExcelUploader from "./component/admin/component/exceluploader";
import PrivacyPolicy from "./component/newcomponent/privacy";
function App() {
  return (
    <>
      <Router>
        <CartProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/login" element={<Login2 />}></Route>
              <Route path="/signup" element={<Sign2 />}></Route>
              <Route path="/cart" element={<Checkout />}></Route>
              <Route path="/shopall" element={<Shopall />}></Route>
              <Route path="/aboutus" element={<Aboutus />}></Route>
              <Route path="/contactus" element={<Contactus />}></Route>
              <Route
                path="/category/:category/:subcategory"
                element={<SubCategoryPage />}
              />

              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/userview" element={<AdminUserView />}></Route>
              {/* admin routes */}
              <Route path="/dashboard" element={<Adminhome />}></Route>
              <Route path="/addproduct" element={<AddProduct />}></Route>
              <Route path="/orderlist" element={<OrderList />}></Route>
              <Route path="/productlist" element={<AdminProductList />}></Route>
              <Route path="/singleproduct" element={<SingleProduct />}></Route>
              <Route path="/category" element={<Category />}></Route>
              <Route path="/fairtrade" element={<Fairtradepage />}></Route>
              <Route path="privacy" element={<PrivacyPolicy />}></Route>
              <Route path="faq" element={<Faqsection />}></Route>
              <Route path="visitjaipur" element={<VisitJaipur />}></Route>
              <Route
                path="/category/:category"
                element={<Categorycart />}
              ></Route>
              <Route
                path="/singleproduct/:id"
                element={<SingleProduct />}
              ></Route>
              <Route path="/excelfile" element={<ExcelUploader />}></Route>
            </Routes>
          </Layout>
        </CartProvider>
      </Router>
    </>
  );
}

export default App;
