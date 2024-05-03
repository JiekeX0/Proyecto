import { vestResolver } from "@hookform/resolvers/vest";
import { Button, Box, TextField} from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { NewProductValidate } from "./NewProductValidate";
import { useMutation } from "@tanstack/react-query";
import { addProductQuery } from "./AddNewProduct.services";
import { Product } from "../../store/product/productStore";

export default function AddNewProduct(){

    const { control, handleSubmit, register, formState, reset } = useForm<Product>({
        mode: 'onTouched',
        reValidateMode: 'onChange',
        resolver: vestResolver(NewProductValidate)
    })

    const mutation = useMutation({mutationFn: (product: Product) => addProductQuery(product), onSuccess: ()=> reset()})
    
    const onSubmit: SubmitHandler<Product> = (product) =>{
        
        console.log(product);
        mutation.mutateAsync(product).then((res)=>console.log({data: res}));
    }

    const onClose = () => {
        reset()
    }

    
    return(
        <Box component='section' sx={{margin: 0, display: 'flex', justifyContent: 'center'}}>
            {mutation.isPending && <h2>Is Pending...</h2>}
            {mutation.isError && <h2>Error message</h2>}

           <form className='newProduct' onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{display:'flex', justifyContent: 'center' ,alignItems: 'center', bgcolor: '#386947', color: 'white', height: 40, fontWeight: 'bolder' }}>ADD NEW PRODUCT</Box>
                <Box sx={{bgcolor: '#f4f9f4', padding: 3}}>
                    <Controller
                        name="title"
                        control={control}
                        render={
                            () =>
                                <TextField
                                    {...register("title")}
                                    required
                                    margin="dense"
                                    id="title"
                                    name="title"
                                    label="Title"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    error={formState.errors.title ? true : false}
                                    helperText={(formState.errors?.title?.message as string) ?? ""}
                                />
                        }
                    />
                    <Controller
                        name="price"
                        control={control}
                        render={
                            () =>
                                <TextField
                                    {...register("price")}
                                    required
                                    margin="dense"
                                    id="price"
                                    name="price"
                                    label="Price"
                                    type="number"
                                    fullWidth
                                    variant="standard"
                                    error={formState.errors.price ? true: false}
                                    helperText={(formState.errors?.price?.message as string) ?? ""}
                                />
                        }
                    />
                     <Controller
                        name="description"
                        control={control}
                        render={
                            () =>
                                <TextField
                                    {...register("description")}
                                    required
                                    margin="dense"
                                    id="description"
                                    name="description"
                                    label="Description"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    error={formState.errors.description ? true : false}
                                    helperText={(formState.errors?.description?.message as string) ?? ""}
                                />
                        }
                    />
                     <Controller
                        name="image"
                        control={control}
                        render={
                            () =>
                                <TextField
                                    {...register("image")}
                                    required
                                    margin="dense"
                                    id="image"
                                    name="image"
                                    label="Image"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    error={formState.errors.image ? true : false}
                                    helperText={(formState.errors?.image?.message as string) ?? ""}
                                />
                        }
                    />
                    <Controller
                        name="category"
                        control={control}
                        render={
                            () =>
                                <TextField
                                    {...register("category")}
                                    required
                                    margin="dense"
                                    id="category"
                                    name="category"
                                    label="Category"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    error={formState.errors.category ? true : false}
                                    helperText={(formState.errors?.category?.message as string) ?? ""}
                                />
                        }
                    />
        
                </Box>

                <Box sx={{display: 'flex', justifyContent: 'space-around', bgcolor: '#cce6d1', color: 'white'}}>
                    <Button onClick={onClose} sx={{width: '50%', color: '#26412c'}}>Cancel</Button>
                    <Button type="submit" sx={{width: '50%', color: '#26412c'}}>Add product</Button>
                </Box>
            </form>
        </Box>
    )
}