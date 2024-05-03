import { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import CircularProgress from '@mui/material/CircularProgress';
import { Product } from '../store/product/productStore';
import { User } from '../store/auth/authStore';
import { Button, Box } from '@mui/material';



export interface Cart {
  id: number;
  userId: number | string;
  date: string;
  products: {
    title: string;
    quantity: number;
  }[];
}

const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch('https://fakestoreapi.com/products');
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch('https://fakestoreapi.com/users');
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
};

const fetchCarts = async (startDate?: string, endDate?: string): Promise<Cart[]> => {
  let url = 'https://fakestoreapi.com/carts';
  if (startDate != null && endDate != null) {
    url += `?startdate=${startDate}&enddate=${endDate}`;
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch carts');
  }
  const cartsData: any[] = await response.json();
  const products: Product[] = await fetchProducts();
  const users: User[] = await fetchUsers();

  const cartsWithProductDetails: Cart[] = cartsData.map((cart) => ({
    id: cart.id,
    userId: cart.userId,
    date: cart.date,
    products: cart.products.map((product: any) => {
      const productInfo = products.find(p => p.id === product.productId);
      return {
        title: productInfo ? productInfo.title : 'Unknown Product',
        quantity: product.quantity
      };
    }),
  }));

  // Replace userId with username
  cartsWithProductDetails.forEach(cart => {
    const user = users.find(u => u.id === cart.userId);
    if (user) {
      cart.userId = user.username;
    }
  });

  return cartsWithProductDetails;
};

const TableCarts = () => {
  const initialState = {
    columns: {
      columnVisibilityModel: {
        image: false,
      },
    },
  };

  const handleEdit = (id: number) => {

  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Cart Id', width: 70 },
    { field: 'userId', headerName: 'User', width: 150 },
    {
      field: 'date',
      headerName: 'Date',
      width: 120,
      renderCell: (params) => {
        const formattedDate = params.value ? dayjs(params.value).format('DD-MM-YYYY') : '';
        return <span>{formattedDate}</span>;
      },
    },
    {
      field: 'products',
      headerName: 'Products',
      width: 800,
      renderCell: (params) => (
        <span>
          {params.value && Array.isArray(params.value) && params.value.map((product: any) => (
            <span key={product.title}> {product.title}: <b>({product.quantity})</b>. </span>
          ))}
        </span>
      )
    },
    {
      field: 'Delete', 
      headerName: 'Delete',
      width: 130, 
      renderCell: (params) => (
        <Button onClick={() => handleEdit(params.row.id)} variant='outlined' color='error'>Delete</Button>
      ),
    },
    {
      field: 'edit', 
      headerName: 'Edit', 
      width: 130,
      renderCell: (params) => (
        <Button onClick={() => handleEdit(params.row.id)} variant='outlined' color='warning'>Edit</Button>
      ),
    },
    
  ];

  const [carts, setCarts] = useState<Cart[]>([]);
  const [startValue, setStartValue] = useState<Dayjs | null>(null);
  const [finValue, setFinValue] = useState<Dayjs | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAllCarts = async () => {
      try {
        setIsLoading(true);
        const allCarts = await fetchCarts();
        setCarts(allCarts);
      } catch (error) {
        console.error('Error fetching all carts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllCarts();
  }, []);

  useEffect(() => {
    const fetchDataWithFilter = async () => {
      try {
        setIsLoading(true);
        let startDate: string | undefined = undefined;
        let endDate: string | undefined = undefined;

        if (startValue && finValue) {
          startDate = startValue.format('YYYY-MM-DD');
          endDate = finValue.format('YYYY-MM-DD');
        }

        const filteredCarts = await fetchCarts(startDate, endDate);
        setCarts(filteredCarts);
      } catch (error) {
        console.error('Error filtering carts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (startValue !== null && finValue !== null) {
      fetchDataWithFilter();
    }
  }, [startValue, finValue]);

  const handleFilter = async () => {
    try {
      setIsLoading(true);
      let startDate: string | undefined = undefined;
      let endDate: string | undefined = undefined;

      if (startValue && finValue) {
        startDate = startValue.format('YYYY-MM-DD');
        endDate = finValue.format('YYYY-MM-DD');
      }

      const filteredCarts = await fetchCarts(startDate, endDate);
      setCarts(filteredCarts);
    } catch (error) {
      console.error('Error filtering carts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ height: 500, width: '100%' }}>
      {isLoading ? <CircularProgress /> :
      <Box sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 2,
        width: '100%',
        height: '15%'
      }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Start Date"
          value={startValue}
          format='DD-MM-YYYY'
          onChange={(newValue) => setStartValue(newValue)}
        />
        <DatePicker
          label="End Date"
          format='DD-MM-YYYY'
          value={finValue}
          onChange={(newValue) => setFinValue(newValue)}
        />
      </LocalizationProvider>
      <button onClick={handleFilter}>Filter</button>
      </Box>}
      <DataGrid
        rows={carts}
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
    </div>
  );
};

export default TableCarts;
