import { Button } from '@mui/material';
import { Avatar } from '@mui/material';

import TextField from '@mui/material/TextField';
import { useForm, Controller } from "react-hook-form";
import { vestResolver } from "@hookform/resolvers/vest";
import { FormValidation } from './LoginPageValidate';


export const LoginPage = () => {

    const { register, handleSubmit, formState, control } = useForm({
        mode: "onChange",
        reValidateMode: "onChange",
        resolver: vestResolver(FormValidation)
    });

    const onSubmit = (data: any) => {
        console.log('Datos del formulario:', data);
    };

    return (
        <>
            <Avatar
                alt="Duck"
                src="../../../public/img/images.jpg"
                sx={{ width: 100, height: 100 }}
            />

            <h1>Login</h1>

            <form onSubmit={handleSubmit(onSubmit)}>

                <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            {...register("username")}
                            id="username-input"
                            label={`${("Usuario")}`}
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
                            {...register("password")}
                            id="password-input"
                            label={`${("Contraseña")}`}
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
                <Button variant="contained" type='submit'>
                    Login
                </Button>
            </form>
        </>
    );
};
