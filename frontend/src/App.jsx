import React, { useState,} from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import LoginPopUp from './components/LoginPopUp/LoginPopUp'
import ExploreMenu from './components/ExpoloreMenu/ExploreMenu'
import AppDownload from './components/AppDownload/AppDownload'
import NoPage from './components/NoPage/NoPage'
import Contact from './components/ContactUs/ContactUs'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'
import OrderSuccess from './components/OrderSuccess/OrderSuccess'

const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  return  (
    <>
    {showLogin?<LoginPopUp setShowLogin={setShowLogin}/>:<></>}

      <div className='app'>
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path = '/cart' element={<Cart/>}/>
          <Route path='/order' element = {<PlaceOrder/>}/>
          <Route path='/mobile-app' element = {<AppDownload/>}/>
          <Route path="/verify" element={<Verify/>}/>
          <Route path="/myorders" element={<MyOrders/>}/>

          
          <Route path='/menu' element = {<ExploreMenu/>}/>
          <Route path='/contact-us' element = {<Contact/>}/>
          <Route path='/order-success' element= {<OrderSuccess/>}/>
          <Route path="/*" element={<NoPage/>} />

        </Routes>
      </div>
      <Footer/>
    </>
    
  )


  
}

export default App
