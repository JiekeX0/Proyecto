import  { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../store/auth/authStore";
import { jwtDecode } from "jwt-decode";
import { CircularProgress } from "@mui/material";


export const UserProfile = () => {
  const user = useAuthStore(state => state.user);
  const [userData, setUserData] = useState(user);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) return;

    const decoded = jwtDecode(token);
    const idUser = decoded.sub;

    fetch(`https://fakestoreapi.com/users/${idUser}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('La solicitud no fue exitosa');
        }
        return response.json();
      })
      .then(data => {
        setUserData(data);
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
      });
  }, []);

  const { isLoading, isError } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      if (!userData) return {}; 
      sessionStorage.setItem("LogedUserName", userData.username)
      return userData;
    }
  });

  if (isLoading) {
    return <CircularProgress/>;
  }

  if (isError) {
    return <div>Error al obtener el perfil de usuario</div>;
  }

  return (
    <div>
    <h2>USER PROFILE</h2>
   
    {userData && (
      <>
        <p>Nombre de usuario: {userData.username}</p>
        <p>Nombre: {userData.name ? `${userData.name.firstname} ${userData.name.lastname}` : 'Sin datos'}</p>
        <p>Email: {userData.email || 'Sin datos'}</p>
        <p>Dirección: {userData.address ? `${userData.address.street}, ${userData.address.city}` : 'Sin datos'}</p>
        <p>Teléfono: {userData.phone || 'Sin datos'}</p>
      </>
    )}
  </div>
  );
};
