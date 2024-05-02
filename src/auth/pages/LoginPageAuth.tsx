import { useState } from 'react';
import { Button } from '@mui/material';
import { Avatar } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useForm, Controller } from "react-hook-form";
import { vestResolver } from "@hookform/resolvers/vest";
import { FormValidation } from './LoginPageValidate';
import { useAuthStore } from '../../store/auth/authStore';
import { useNavigate } from 'react-router-dom';


export const LoginPageAuth = () => {
    const [error, setError] = useState<string | null>(null); 

    const { handleSubmit, formState, control } = useForm({
        mode: "onChange",
        reValidateMode: "onChange",
        resolver: vestResolver(FormValidation)
    });

    const handleLogin = async (data: any) => {
        try {
            const response = await fetch('https://fakestoreapi.com/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log('Inicio de sesión exitoso');
                sessionStorage.setItem('isLoggedIn', 'true'); 
                changeLogged();
                navigate('/products');
                
            } else {
                const responseData = await response.json();
                setError(responseData.message || 'Error al iniciar sesión');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            setError('Error al iniciar sesión');
        }
    };

    const changeLogged = useAuthStore(state => state.changeLogged)

    const navigate = useNavigate();

    return (
        <>
            <Avatar
                alt="Duck"
                src="../../../public/img/images.jpg"
                sx={{ width: 300, height: 300 }}
            />

            <h1>Login</h1>

            <form onSubmit={handleSubmit(handleLogin)}>
                <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            id="username-input"
                            label="User"
                            variant="outlined"
                            sx={{ m: 2 }}
                            error={formState.errors?.username ? true : false}
                            helperText={(formState.errors?.username?.message as string) ?? ""}
                            size="small"
                        />
                    )}
                />
                <br />
                
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            id="password-input"
                            label="Password"
                            variant="outlined"
                            sx={{ m: 2 }}
                            type='password'
                            error={formState.errors?.password ? true : false}
                            helperText={(formState.errors?.password?.message as string) ?? ""}
                            size="small"
                        />
                    )}
                />
                <br />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <h5>johnd</h5>
                <h5>m38rmF$</h5>
                <Button variant="contained" type='submit'>
                    Login
                </Button>
            </form>
        </>
    );
};
