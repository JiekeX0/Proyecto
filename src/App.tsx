import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import TableCarts from './components/TableCarts';
import { TableProducts } from './components/TableProducts';
import AddNewProduct from './components/AddNewProduct/AddNewProduct';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/products" element={<TableProducts />} />
        <Route path="/cart" element={<TableCarts />} />
        <Route path="/new-product" element={<AddNewProduct />} />
      </Routes>
    </>
  );
}

export default App;
