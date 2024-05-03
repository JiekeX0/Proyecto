import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import TableCarts from './components/TableCarts';
import { UserProfile } from './components/UserProfile';
import { TableProducts } from './components/TableProducts';
import { AddNewCart } from './components/AddNewCart/AddNewCart';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/cart" element={<TableCarts />} />
        <Route path="/Profile" element={<UserProfile />} />
        <Route path="/products" element={<TableProducts />} />
        <Route path="/cart" element={<TableCarts />} />
        <Route path="/new-cart" element={<AddNewCart />} />
      </Routes>
    </>
  );
}

export default App;
