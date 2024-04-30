import { useQuery } from '@tanstack/react-query';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

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

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'title', headerName: 'Title', width: 200 },
  { field: 'price', headerName: 'Price', width: 120 },
  { field: 'description', headerName: 'Description', width: 300 },
  { field: 'category', headerName: 'Category', width: 150 },
];

const ProductsTable = () => {
  const { data: products, isLoading, isError } = useQuery({ queryKey: ["productos"], queryFn: async () => fetchProducts().then((res) => res) });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching products</div>;
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={products}
        columns={columns}
        pagination
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
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
    </div>
  );
};

export default ProductsTable;
