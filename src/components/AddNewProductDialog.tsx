import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { create, test, enforce } from "vest";


interface Product{
    id?: number;
    title: string;
    price: number | null;
    category: string;
    description: string;
    image:string;
    rating?: {
        rate: number;
        count: number;
    }
}




export default function AddNewProductDialog(){

    const { control, handleSubmit, register } = useForm({
        defaultValues: {
            title: "",
            price: null,
            category: "",
            description: "",
            image:""
        }
    })

    const onSubmit: SubmitHandler<Product> = (data) =>{
        console.log(data)

    }

    const [open, setOpen] = useState(false);

    const onOpen = () => {
        setOpen(true);
    }

    const onClose = () => {
        setOpen(false)
    }

    return(
        <>
            <Button onClick={onOpen} > Add Product </Button>
            <Dialog
                open={open}
                onClose={onClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: handleSubmit(onSubmit),
                }}
            >
                <DialogTitle sx={{textAlign: 'center', bgcolor: '#2a2829', color: 'white'}}>Add New Product</DialogTitle>
                <DialogContent sx={{bgcolor: '#dcdde1'}}>
                    <Controller
                        name="title"
                        control={control}
                        render={
                            ({field}) =>
                                <TextField
                                    {...field}
                                    {...register("title")}
                                    autoFocus
                                    required
                                    margin="dense"
                                    id="title"
                                    name="title"
                                    label="Title"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                />
                        }
                    />
                    <Controller
                        name="price"
                        control={control}
                        render={
                            ({field}) =>
                                <TextField
                                    {...field}
                                    {...register("price")}
                                    autoFocus
                                    required
                                    margin="dense"
                                    id="price"
                                    name="price"
                                    label="Price"
                                    type="number"
                                    fullWidth
                                    variant="standard"
                                />
                        }
                    />
                     <Controller
                        name="description"
                        control={control}
                        render={
                            ({field}) =>
                                <TextField
                                    {...field}
                                    {...register("description")}
                                    autoFocus
                                    required
                                    margin="dense"
                                    id="description"
                                    name="description"
                                    label="Descripción"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                />
                        }
                    />
                     <Controller
                        name="image"
                        control={control}
                        render={
                            ({field}) =>
                                <TextField
                                    {...field}
                                    {...register("image")}
                                    autoFocus
                                    required
                                    margin="dense"
                                    id="image"
                                    name="image"
                                    label="Image"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                />
                        }
                    />
                    <Controller
                        name="category"
                        control={control}
                        render={
                            ({field}) =>
                                <TextField
                                    {...field}
                                    {...register("category")}
                                    autoFocus
                                    required
                                    margin="dense"
                                    id="category"
                                    name="category"
                                    label="Category"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                />
                        }
                    />
        
                </DialogContent>
                <DialogActions sx={{display: 'flex', justifyContent: 'space-around', bgcolor: '#2a2829', color: 'white'}}>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit">Subscribe</Button>
                </DialogActions>

            </Dialog>

        </>
    )
}