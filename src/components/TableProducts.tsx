import { useQuery } from '@tanstack/react-query';
import { DataGrid, GridColDef, GridApi } from "@mui/x-data-grid";
import { Button, Modal, Backdrop, Fade, Box, Typography } from '@mui/material';
import { useState } from 'react';


export interface Product {
  id?: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch('https://fakestoreapi.com/products');
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

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


const ProductsTable = () => {

  const [open, setOpen] = useState(false); // Estado para controlar si la modal está abierta
  const [selectedRowData, setSelectedRowData] = useState<any>(null); // Estado para almacenar los datos de la fila seleccionada

  //* hace que esa columna no sea visible
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

          // return alert(JSON.stringify(thisRow, null, 4));
          setSelectedRowData(thisRow);
          setOpen(true);
        };

        return <Button onClick={onClick}>Click</Button>;
      }
    },
  ];

  const { data: products, isLoading, isError } = useQuery({ queryKey: ["productos"], queryFn: async () => fetchProducts().then((res) => res) });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching products</div>;
  }

  return (
    <div style={{ height: 800, width: '100%' }}>
      <DataGrid
        rows={products}
        columns={columns}
        pagination
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
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
    </div>
  );
};

export default ProductsTable;
