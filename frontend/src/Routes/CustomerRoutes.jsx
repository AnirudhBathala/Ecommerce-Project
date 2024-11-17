import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navigation from '../customer/components/Navigation/Navigation'
import HomePage from '../Pages/HomePage'
import Cart from '../customer/components/Cart/Cart'
import Order from '../customer/components/Order/Order'
import Product from '../customer/components/Product/Product'
import ProductDetails from '../customer/components/ProductDetails/ProductDetails'
import Checkout from '../customer/components/Checkout/Checkout'
import OrderDetails from '../customer/components/Order/OrderDetails'

const CustomerRoutes = () => {
  return (
    <div>
      <div>
        
        <Navigation/>
        {/* <Checkout/> */}
        <Routes>
          <Route path="/login" element={<HomePage />}></Route>
          <Route path="/register" element={<HomePage />}></Route>
          <Route path='/' element={<HomePage />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/account/order' element={<Order />} />
          <Route path="/:level1/:level2/:level3" element={<Product />}></Route>
          {/* <Route path='/:level1/:level2/:level3/product' element={<Product />} /> */}
          <Route path="/account/order/:orderId" element={<OrderDetails />}></Route>
          <Route path='/product/:productId' element={<ProductDetails />} />
          <Route path='/checkout' element={<Checkout />} />



        </Routes>
      </div>
    </div>
  )
}

export default CustomerRoutes
