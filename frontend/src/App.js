import logo from './logo.svg';
import './App.css';
import HomePage from './Pages/HomePage';
import ProductCard from './customer/components/ProductCard/ProductCard';
import Product from './customer/components/Product/Product';
import ProductDetails from './customer/components/ProductDetails/ProductDetails';
import Cart from './customer/components/Cart/Cart';
import Navigation from './customer/components/Navigation/Navigation';
import Footer from './customer/components/Footer/Footer';
import Checkout from  './customer/components/Checkout/Checkout'
import Order from './customer/components/Order/Order'
import OrderDetails from './customer/components/Order/OrderDetails'
import { Route, Routes } from 'react-router-dom';
import CustomerRoutes from './Routes/CustomerRoutes';
function App() {
  return (
    <div className="App">

      <Routes>
        <Route path='/*' element={<CustomerRoutes/>}/>

      </Routes>
      {/* <Navigation/> */}
      {/* <HomePage/> */}
      {/* <ProductCard /> */}
      {/* <Product/> */}
      {/* <ProductDetails/> */}
      {/* <Cart/> */}
      {/* <Checkout/> */}
      {/* <Order/>  */}
      {/* <OrderDetails/> */}
      {/* <Footer/> */}
    </div>
  );
}

export default App;
