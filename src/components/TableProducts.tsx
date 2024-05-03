import { Product, useProductStore } from '../store/product/productStore';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import EditForm from './EditForm';
import { DataGrid, GridColDef, GridApi } from "@mui/x-data-grid";
import { Button, Modal, Backdrop, Fade, Box, Typography } from '@mui/material';

export const TableProducts = () => {
  const { products, setProducts, deleteProduct, editProduct } = useProductStore();
  const [editProductData, setEditProductData] = useState<Product | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [open, setOpen] = useState(false); // Estado para controlar si la modal está abierta
  const [selectedRowData, setSelectedRowData] = useState<any>(null); // Estado para almacenar los datos de la fila seleccionada

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

  const { data } = useQuery({
    queryKey: ["getProducts"],
    queryFn: async () => fetch('https://fakestoreapi.com/products').then((data) => data.json()),
  });

  const handleDelete = (productId: number) => {
    deleteProduct(productId);
  }

  const handleEdit = (productId: number, productData: Product) => {
    setEditProductData(productData);
  };

  const handleSaveEdit = (productId: number, updatedProduct: Product) => {
    editProduct(productId, updatedProduct);
    setEditProductData(null);
  };

  useEffect(() => {
    setProducts(data as unknown as Product[] ?? []);
  }, [data]);

  const handleSort = (field: string) => {
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
        <button onClick={() => handleEdit(params.row.id, params.row)}>Edit</button>
      ),
    },
  ];

  return (
    <div style={{ height: 800, width: '100%' }}>
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
      <div>
        <button onClick={() => handleSort('title')}>Sort by Title</button>
        <button onClick={() => handleSort('price')}>Sort by Price</button>
        <button onClick={() => handleSort('category')}>Sort by Category</button>
      </div>
    </div>
  );
};
