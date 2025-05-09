import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios"
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const {getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext);

  const [paymentMethod, setPaymentMethod] = useState("online");
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  //store info of form fields
  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const onChangeHandler = (event)=>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const placeOrder = async (event)=>{
    event.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if (cartItems[item._id]>0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id]
        orderItems.push(itemInfo)
      
      }

    })

    let orderData = {
      address:data,
      items:orderItems,
      amount: getTotalCartAmount() + 2,
    }
    try{
      let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
      if (response.data.success) {
        if(paymentMethod === "online"){
          const {session_url} = response.data;
          window.location.replace(session_url);
        }else {
          //for cash on delivery
          navigate("/order-success",{state: {orderId: response.data.orderId}});
        }
      }else{
        alert(response.data.message);
      }
    }catch(error) {
      alert("An error occured while placing order");
      console.log(error(error));
    } finally {
      setIsProcessing(false);
    }
    
    
  }

  useEffect(()=>{
    if (!token) {
      navigate("/cart")
    }else if(getTotalCartAmount()===0)
    {
      navigate("/cart")
    }

  },[token])

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery information</p>
        <div className="multi-fields">
          <input required type="text" name="firstName" onChange={onChangeHandler} value={data.firstName}  placeholder="First Name" />
          <input  required type="text" name="lastName" onChange={onChangeHandler} value={data.lastName} placeholder="Last Name" />
        </div>
        <input required type="email" name="email" onChange={onChangeHandler} value={data.email} placeholder="Email adress" />
        <input required type="text" name="street" onChange={onChangeHandler} value={data.street} placeholder="Street" />
        <div className="multi-fields">
          <input required type="text" name="city" onChange={onChangeHandler} value={data.city} placeholder="City" />
          <input required type="text" name="state" onChange={onChangeHandler} value={data.state} placeholder="State" />
        </div>
        <div className="multi-fields">
          <input required type="text" name="zipcode" onChange={onChangeHandler} value={data.zipcode} placeholder="ZipCode" />
          <input required type="text" name="country" onChange={onChangeHandler} value={data.country} placeholder="Country" />
        </div>
        <input required type="text" name="phone" onChange={onChangeHandler} value={data.phone} placeholder="phone" />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>cart Totals</h2>

          <div>
            <div className="cart-total-details">
              <p>SubTotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />

            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />

            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            </div>
            <div className="payment-methods">
              <label>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="online" 
                  checked={paymentMethod === "online"}
                  onChange={() => setPaymentMethod("online")}
                />
                Pay Online
              </label>
              <label>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="cod" 
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                Cash on Delivery
              </label>
            </div>
          </div>
          <button type="submit" disabled={isProcessing}>
            {isProcessing ? "Processing..." : 
             paymentMethod === "online" ? "PAY NOW" : "PLACE ORDER"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
