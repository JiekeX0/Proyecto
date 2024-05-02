import { Routes, Route } from "react-router-dom"
import { useAuthStore } from "../store/auth/authStore"
import { TableProducts } from "../components/TableProducts"
import { LoginPageAuth } from "../auth/pages/LoginPageAuth"
import AddNewProduct from "../components/AddNewProduct/AddNewProduct"


export const AppRoutes = () =>{


    const logged = useAuthStore(state => state.logged)

  
    return(
      <Routes>
          {!logged && 
          <Route path="/" element={<LoginPageAuth />}/>   
          }
          {
          // logged && 
            <Route 
            path="products" 
            element={<TableProducts />}
            />
          }
          <Route path="products/create" element={<AddNewProduct />}/> 
        </Routes> 
    )
}