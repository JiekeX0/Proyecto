import { Button, TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { Product } from '../store/product/productStore';
import { EditFormValidation } from './editFormValidate';
import { vestResolver } from '@hookform/resolvers/vest';

interface EditFormProps {
  product: Product;
  onSave: (updatedProduct: Product) => void;
  onCancel: () => void;
}

const EditForm = ({ product, onSave, onCancel }: EditFormProps) => {

  const { control, formState, handleSubmit } = useForm({ 
    defaultValues: product, 
    resolver: vestResolver(EditFormValidation), 
    mode: 'onChange', 
  });

  const handleSave = (data: Product) => {
    onSave(data);
  };

  return (
    <div style={{ margin: 'auto', maxWidth: '800px' }}>
      <form onSubmit={handleSubmit(handleSave)}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Title"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!formState.errors?.title}
                helperText={formState.errors?.title ? formState.errors.title.message : ''}
              />
            )}
          />
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Price"
                variant="outlined"
                fullWidth
                margin="normal"
                type="number"
                error={!!formState.errors?.price}
                helperText={formState.errors?.price ? formState.errors.price.message : ''}
              />
            )}
          />
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Category"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!formState.errors?.category}
                helperText={formState.errors?.category ? formState.errors.category.message : ''}
              />
            )}
          />
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Image"
                variant="outlined"
                margin="normal"
                style={{ width: '100%' }}
                error={!!formState.errors?.image}
                helperText={formState.errors?.image ? formState.errors.image.message : ''}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                variant="outlined"
                margin="normal"
                style={{ width: '100%' }}
                error={!!formState.errors?.description}
                helperText={formState.errors?.description ? formState.errors.description.message : ''}
              />
            )}
          />
        <div style={{ textAlign: 'left', marginTop: '20px', marginBottom: '50px' }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ backgroundColor: 'black', color: 'white', marginRight: '15px' }}
          >
            Save
          </Button>
          <Button
            type="button"
            onClick={onCancel}
            variant="outlined"
            style={{ backgroundColor: 'black', color: 'white'}}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;