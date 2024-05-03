import { Button, Box, TextField, Autocomplete } from "@mui/material";
import { useForm, Controller, SubmitHandler, useFieldArray } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addCartQuery } from "./AddNewCart.services";
import { Cart } from '../TableCarts';
import { vestResolver } from "@hookform/resolvers/vest";
import { NewCartValidate } from "./NewCartValidate";
import { Product } from "../../store/product/productStore";
import { useState, useEffect } from "react";



export function AddNewCart() {

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const { control, handleSubmit, register, formState, reset, setValue, setError } = useForm<Cart>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: vestResolver(NewCartValidate)
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'products',
  });

  const { data } = useQuery({
    queryKey: ["getProducts"],
    queryFn: async () => fetch('https://fakestoreapi.com/products').then((data) => data.json()),
  });

  const mutation = useMutation({ mutationFn: (cart: Cart) => addCartQuery(cart), onSuccess: () => reset() })

  const onSubmit: SubmitHandler<Cart> = (cart) => {
    if (!isSubmitDisabled) {
      console.log(cart);
      mutation.mutateAsync(cart).then((res) => console.log({ data: res }));
    }
  };

  useEffect(() => {
    setIsSubmitDisabled(fields.length === 0);
  }, [fields]);

  const onClose = () => {
    reset()
  }


  return (
    <Box component='section' sx={{ margin: 0, display: 'flex', justifyContent: 'center' }}>
      <form className='newCart' onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: '#386947', color: 'white', height: 40, fontWeight: 'bolder' }}>ADD NEW CART</Box>
        <Box sx={{ bgcolor: '#f4f9f4', padding: 3 }}>



          <Controller
            name="userId"
            control={control}
            render={
              () =>
                <TextField
                  {...register("userId")}
                  required
                  margin="dense"
                  id="userId"
                  name="userId"
                  label="User Id"
                  type="number"
                  fullWidth
                  variant="standard"
                  error={formState.errors.userId ? true : false}
                  helperText={(formState.errors?.userId?.message as string) ?? ""}
                />
            }
          />
          <Controller
            name="date"
            control={control}
            render={
              () =>
                <TextField
                  {...register("date")}
                  required
                  margin="dense"
                  id="date"
                  name="date"
                  label="Date"
                  type="date"
                  fullWidth
                  variant="standard"
                  error={!!formState.errors.date}
                  helperText={formState.errors.date?.message ?? ""}
                />
            }
          />
          <Box>
            {fields.map((_, index) => (
              <Box key={index}>
                <Controller
                  name={`products.${index}.title`}
                  control={control}
                  rules={{ required: `El nombre del producto ${index + 1} es un campo requerido` }}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <Autocomplete
                      style={{ width: 300 }}
                      options={data}
                      autoHighlight
                      onChange={onChange}
                      onBlur={onBlur}
                      getOptionLabel={(option: Product) => option.title}
                      renderInput={(params: any) => (
                        <TextField
                          {...params}
                          {...register(`products.${index}.title`)}
                          label="Productos"
                          variant="outlined"
                          error={formState.errors.products?.[index]?.title ? true : false}
                          helperText={(formState.errors?.products?.[index]?.title?.message as string) ?? ""}
                          fullWidth
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: "disabled" 
                          }}
                        />
                      )}
                    />
                  )}
                />
                <Controller
                  name={`products.${index}.quantity`}
                  control={control}
                  defaultValue={0}
                  rules={{
                    required: `La cantidad del producto ${index + 1} es un campo requerido`,
                    min: { value: 1, message: `La cantidad del producto ${index + 1} debe ser mayor que cero` }
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Quantity"
                      type="number"
                      fullWidth
                      variant="standard"
                      style={{ marginBottom: '16px' }}
                      error={!!formState.errors?.products?.[index]?.quantity}
                      helperText={(formState.errors?.products?.[index]?.quantity?.message as string) ?? ""}
                    />
                  )}
                />
                <Button onClick={() => remove(index)}>Remove</Button>
              </Box>
            ))}

            <Button
              onClick={() => {
                if (!fields.some((_, index) => Object.keys(formState.errors?.products?.[index] || {}).length)) {
                  append({ title: "", quantity: 0 });
                } else {
                  setError(`products.${fields.length}.title`, { type: 'required', message: 'El nombre del producto es un campo requerido' });
                  setError(`products.${fields.length}.quantity`, { type: 'required', message: 'La cantidad del producto es un campo requerido' });
                }
              }}
            >
              Add Product
            </Button>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-around', bgcolor: '#cce6d1', color: 'white' }}>
          <Button onClick={onClose} sx={{ width: '50%', color: '#26412c' }}>Cancel</Button>
          <Button type="submit" sx={{ width: '50%', color: '#26412c' }}
            disabled={isSubmitDisabled}>
            Add Cart
          </Button>
        </Box>
      </form>
    </Box>
  )
}
