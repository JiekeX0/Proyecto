import { Routes, Route } from "react-router-dom"
import { useAuthStore } from "../store/auth/authStore"
import TestLogin from "../components/TestLogin"
import TableProducts from "../components/TableProducts"

export const AppRoutes = () =>{


    const logged = useAuthStore(state => state.logged)


    //queda penidente cambiar los componentes de Test por las paginas de la aplicación
    return(
      <Routes>
            {!logged 
            ?   <Route path="/" element={<TestLogin />}/>
           :    <Route path="products" element={<TableProducts />}/>
            }

        </Routes> 
    )
}