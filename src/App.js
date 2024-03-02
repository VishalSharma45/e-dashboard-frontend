import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import PrivateComponent from './components/PrivateComponent';
import Login from './pages/Login';
import AddProduct from './pages/AddProduct';
import ProductList from './pages/ProductList';
import UpdateProduct from './pages/UpdateProduct';
import Profile from './pages/Profile';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Toaster />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path='/' element={<ProductList />} />
            <Route path='/add' element={<AddProduct />} />
            <Route path='/update/:id' element={<UpdateProduct />} />
            <Route path='/logout' element={<h1>logout Component</h1>} />
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
