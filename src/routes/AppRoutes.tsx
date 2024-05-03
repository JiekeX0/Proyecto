import { Routes, Route } from "react-router-dom"
import { useAuthStore } from "../store/auth/authStore"
import App from "../App"
import { LoginPageAuth } from "../auth/pages/LoginPageAuth"
import TableCarts from '../components/TableCarts';
import ProductsTable from "../components/TableProducts";
import AddNewProduct from "../components/AddNewProduct/AddNewProduct"
import { UserProfile } from "../components/UserProfile";


export const AppRoutes = () =>{


    const logged = useAuthStore(state => state.logged)
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');

    if (isLoggedIn === 'true') {
        useAuthStore.setState({ logged: true });
    }

    return(
      <Routes>
            {!logged 
            ?   <Route path="/" element={<LoginPageAuth />}/>
            :    <Route path="/" element={<App />}>
                    <Route path="products" element={<ProductsTable />} />
                    <Route path="cart" element={<TableCarts />} />
                    <Route path="new-product" element={<AddNewProduct />} />
                    <Route path="profile" element={<UserProfile />} />
                </Route>
            }
        </Routes> 
    )
}