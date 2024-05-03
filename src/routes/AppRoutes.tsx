import { Routes, Route } from "react-router-dom";
import { useAuthStore } from "../store/auth/authStore";
import { TableProducts } from "../components/TableProducts";
import { LoginPageAuth } from "../auth/pages/LoginPageAuth";
import AddNewProduct from "../components/AddNewProduct/AddNewProduct";
import TableCarts from "../components/TableCarts";
import App from "../App";
import { AddNewCart } from "../components/AddNewCart/AddNewCart";

export const AppRoutes = () => {
  const logged = useAuthStore((state) => state.logged);
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');

  if (isLoggedIn === 'true') {
    useAuthStore.setState({ logged: true });
  }

  return (
    <Routes>
      {!logged
        ? <Route path="/" element={<LoginPageAuth />} />
        : <Route path="/" element={<App />}>
          <Route path="products" element={<TableProducts />} />
          <Route path="cart" element={<TableCarts />} />
          <Route path="new-product" element={<AddNewProduct />} />
          <Route path="/new-cart" element={<AddNewCart />} />
        </Route>
      }
    </Routes>
  );
};

