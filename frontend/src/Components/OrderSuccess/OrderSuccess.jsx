
import React from 'react';
import "./OrderSuccess.css"
import { useLocation } from 'react-router-dom';
import { assets } from '../../assets/assets';

const OrderSuccess = () => {
  const location = useLocation();
  const orderId = location.state?.orderId;

  return (
    <div className="order-success">
      <img src={assets.success_icon} alt="Success" className='success-img' />
      <h2>Order Placed Successfully!</h2>
      <p>Your order ID is: {orderId}</p>
      <p>Thank you for your purchase.</p>
      <button onClick={() => window.location.href = "/myorders"}>
        View Your Orders
      </button>
    </div>
  );
};

export default OrderSuccess;