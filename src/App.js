import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import PrivateComponent from './components/PrivateComponent';
import Login from './pages/Login';
import AddProduct from './pages/AddProduct';
import ProductList from './pages/ProductList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path='/' element={<ProductList />} />
            <Route path='/add' element={<AddProduct />} />
            <Route path='/update' element={<h1>Update Product Component</h1>} />
            <Route path='/logout' element={<h1>logout Component</h1>} />
            <Route path='/profile' element={<h1>profile Component</h1>} />
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
