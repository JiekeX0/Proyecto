import { useAuthStore } from "../store/auth/authStore"
import { useNavigate } from "react-router-dom"

export default function TestLogin (){

    const user = useAuthStore(state => state.user)
    const changeLogged = useAuthStore(state => state.changeLogged)
    const setUSer = useAuthStore(state => state.setUser)

    const navigate = useNavigate();

    const handlerLogIn = ()=>{
        setUSer({username: 'test', password: 'test'})
        if(user){
            changeLogged()
            navigate('/products')
        }
    }


    return(
        <>
            <h1>Pagina de TestLogin</h1>
            <button onClick={handlerLogIn}>Login</button>
        </>
    )

}