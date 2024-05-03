import { Product, useProductStore } from '../store/product/productStore';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import EditForm from './EditForm';
import { DataGrid, GridColDef, GridApi } from "@mui/x-data-grid";
import { Button, Modal, Backdrop, Fade, Box, Typography,Grid, CircularProgress } from '@mui/material';
import { FilterByCategory } from './FilterByCategory';
import { ProductCard } from './ProductCard';
import AddNewProduct from './AddNewProduct/AddNewProduct';


export interface Category{
  firstLetter: string,
  category: string
}

export const TableProducts = () => {
  const { products, setProducts, deleteProduct, editProduct } = useProductStore();
  const [editProductData, setEditProductData] = useState<Product | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [open, setOpen] = useState(false); // Estado para controlar si la modal está abierta
  const [selectedRowData, setSelectedRowData] = useState<any>(null); // Estado para almacenar los datos de la fila seleccionada
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [addProduct, setAddProdut] = useState(false);

  let categories:Category [] = [];
  
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '0px solid #000',
    boxShadow: 24,
    p: 4,
  };


  async function fetchProducts(){
    if(selectedCategory !== null){
      const res = await fetch(`https://fakestoreapi.com/products/category/${selectedCategory.category}`);
      const json = await res.json();
        return json;
    }

      const res = await fetch('https://fakestoreapi.com/products')
      const json = await res.json();
        return json;
  }

  const { data, isLoading } = useQuery({
    queryKey: ["getProducts", selectedCategory],
    queryFn: async () => fetchProducts()
  });



  const handleDelete = (productId: number) => {
    deleteProduct(productId);
  }

  const handleEdit = ( productData: Product) => {
    setEditProductData(productData);
  };

  const handleSaveEdit = (productId: number, updatedProduct: Product) => {
    editProduct(productId, updatedProduct);
    setEditProductData(null);
  };

  useEffect(() => {
    setProducts(data as unknown as Product[] ?? []);
  }, [data]);

  async function fetchCategory(){
    const res = await fetch('https://fakestoreapi.com/products/categories');
    const json = await res.json();
    return json;
  }

  const allCategories = useQuery({queryKey: ['categories'], queryFn: ()=>fetchCategory()})
   
 
      {allCategories.isLoading && <h1>Is Loading...</h1>}
      {allCategories.isError && <h1>Error...</h1>}
    
      if(allCategories.isSuccess){
           categories = allCategories?.data.map((category: string) => {
           const firstLetter = category[0].toUpperCase();
           return {
               firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
               category: category,
            }; 
        }); 
  }

  const handleSort = (field: string) => {
    setSelectedCategory(null)
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        const sortedProducts = [...data].sort((a, b) => {
          if (a[field] < b[field]) return sortOrder === 'asc' ? -1 : 1;
          if (a[field] > b[field]) return sortOrder === 'asc' ? 1 : -1;
          return 0;
        });
        
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        setProducts(sortedProducts);
      })
      .catch(error => {
        console.error('Error sorting products:', error);
      });
  };

  const initialState = {
    columns: {
      columnVisibilityModel: {
        image: false,
      },
    },
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'price', headerName: 'Price', width: 120 },
    { field: 'description', headerName: 'Description', width: 300 },
    { field: 'category', headerName: 'Category', width: 150 },
    { field: 'image' },
    {
      field: 'view', headerName: 'More information', width: 150,
      renderCell: (params) => {
        const onClick = (e: { stopPropagation: () => void; }) => {
          e.stopPropagation();
          const api: GridApi = params.api;
          const thisRow: Record<string, any> = {};
          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.row[c.field])
            );
          setSelectedRowData(thisRow);
          setOpen(true);
        };
        return <Button onClick={onClick}>Click</Button>;
      }
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 150,
      renderCell: (params) => (
        <button onClick={() => handleDelete(params.row.id)}>Delete</button>
      ),
    },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 150,
      renderCell: (params) => (
        <button onClick={() => handleEdit(params.row.id)}>Edit</button>
      ),
    },
  ];


  const handleAddProduct = () => {
    setSelectedCategory(null)
    setAddProdut(true);
}

  return (
    <div style={{ height: 800, width: '100%' }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 2,
        width: '100%',
        height: '9%'
      }}>
        <button onClick={() => handleSort('title')}>Sort by Title</button>
        <button onClick={() => handleSort('price')}>Sort by Price</button>
        <button onClick={() => handleSort('category')}>Sort by Category</button>
        <button onClick={handleAddProduct}>Add Product</button>
        <FilterByCategory selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} categories={categories}/>
      </Box>

      <AddNewProduct open={addProduct} setOpen={setAddProdut} />

      {selectedCategory ? 
            isLoading?
              <CircularProgress color="info" size={250} sx={{alignSelf: 'center'}}/>
            :<Grid container direction="row" justifyContent='center' spacing={{ xs:3, md: 4}}> 
                {products.map((product: Product)=>
                    <Grid item key={product.id}><ProductCard product={product}/></Grid>
                )}
            </Grid> 
      :<>
      <DataGrid
        rows={products}
        columns={columns}
        pagination
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
        disableColumnMenu
        disableColumnSorting
        initialState={initialState}
        sx={{
          '& .MuiDataGrid-colCell': {
            backgroundColor: '#a38d9e',
          },
          '& .MuiDataGrid-row:nth-of-type(odd)': {
            backgroundColor: '#e8f1ec',
          },
          '& .MuiDataGrid-row:nth-of-type(even)': {
            backgroundColor: '#ced9d1',
          },
          boxShadow: 2,
          border: 2,
          borderColor: '#386947',
        }}
        />
      {editProductData && (
        <EditForm
        product={editProductData}
        onSave={(updatedProduct) => handleSaveEdit(editProductData.id, updatedProduct)}
        onCancel={() => setEditProductData(null)}
        />
      )}

      <div style={{ height: 0, width: '100%' }}>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={() => setOpen(false)}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
          >
          <Fade in={open}>
            <Box sx={style}>
              <Typography variant="h5" component="h2">
                {selectedRowData ? selectedRowData['title'] : 'No data'}
              </Typography>
              <br />
              <Typography align='center'>
                <img
                  src={selectedRowData ? selectedRowData['image'] : 'No data'}
                  alt=""
                  />
              </Typography>
              <Typography variant="h6" component="h2">
                Price: {selectedRowData ? selectedRowData['price'] : 'No data'}€
              </Typography>
              <Typography variant="h6" component="h2">
                Category: {selectedRowData ? selectedRowData['category'] : 'No data'}
              </Typography>
              <Typography align='justify'>
                {selectedRowData ? selectedRowData['description'] : ''}
              </Typography>
            </Box>
          </Fade>
        </Modal>
      </div>
      </>}
    </div>
  );
};
