import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Product, useProductStore } from '../store/product/productStore';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import EditForm from './EditForm';

const TableProducts = () => {
  const { products, setProducts, deleteProduct, editProduct } = useProductStore();
  const [editProductData, setEditProductData] = useState<Product | null>(null);

  const { data } = useQuery({
    queryKey: ["getProducts"],
    queryFn: async () => fetch('https://fakestoreapi.com/products').then((data) => data.json()),
  });

  const handleDelete = (productId: number) => {
    deleteProduct(productId);
  };

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
    fetch(`https://fakestoreapi.com/products?sort=${field}`)
      .then(res => res.json())
      .then(json => setProducts(json));
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'price', headerName: 'Price', width: 120 },
    { field: 'category', headerName: 'Category', width: 150 },
    { field: 'image', headerName: 'Image', width: 300 },
    { field: 'description', headerName: 'Description', width: 300 },
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
    <div style={{ margin: '10%', height: 400, width: '100%', maxWidth: '1500px' }}>
      <div>
        <button onClick={() => handleSort('title')}>Sort by Title</button>
        <button onClick={() => handleSort('price')}>Sort by Price</button>
        <button onClick={() => handleSort('category')}>Sort by Category</button>
      </div>
      <DataGrid rows={products} columns={columns} />
      {editProductData && (
        <EditForm
          product={editProductData}
          onSave={(updatedProduct) => handleSaveEdit(editProductData.id, updatedProduct)}
          onCancel={() => setEditProductData(null)}
        />
      )}
    </div>
  );
};

export default TableProducts;