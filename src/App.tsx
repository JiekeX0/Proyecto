import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import TableCarts from './components/TableCarts';
import { TableProducts } from './components/TableProducts';
import AddNewProduct from './components/AddNewProduct/AddNewProduct';
import { AddNewCart } from './components/AddNewCart/AddNewCart';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/products" element={<TableProducts />} />
        <Route path="/cart" element={<TableCarts />} />
        <Route path="/new-product" element={<AddNewProduct />} />
        <Route path="/new-cart" element={<AddNewCart />} />
      </Routes>
    </>
  );
}

export default App;
