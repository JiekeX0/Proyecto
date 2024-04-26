import { useAuthStore } from "../store/auth/authStore";
import { useNavigate } from "react-router-dom";

export default function TestProductos (){

    const changeLogged = useAuthStore(state => state.changeLogged)

    const navigate = useNavigate();

    const handlerLogOut= ()=>{
        changeLogged()
        navigate('/login')
        
    }

    return(
        <>
            <h1>Pagina de TestProductos</h1>
            <button onClick={handlerLogOut}>Salir</button>
        </>
    )
}