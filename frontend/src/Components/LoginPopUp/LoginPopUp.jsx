import React, { useState, useContext } from 'react'
import './LoginPopUp.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import axios from "axios"

const LoginPopUp = ({setShowLogin}) => {

  const {url,setToken} = useContext(StoreContext)

  const [currState, setCurrState] = useState("Sign Up");

  const [data,setData] = useState({
    name:"",
    email:"",
    password:""
  })
                          
  //take input and save in data varible
  const onChangeHandler = (event)=>{
    const name = event.target.name
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }    

  const onLogin = async (event)=>{
    event.preventDefault();//prevent default behaviour
    let newUrl = url;
    if(currState ==="Login") {
      newUrl += "/api/user/login"
    }
    else{
      newUrl += "/api/user/register"
    }

    

    const response = await axios.post(newUrl,data);

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token",response.data.token);
      localStorage.setItem("name", response.data.name);
      setShowLogin(false);
    }
    else{
      alert(response.data.message);
    }

  }

 

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>

        <div className="login-popup-input">
          {currState==="Login"?<></>:<input type="text" name="name" onChange={onChangeHandler} value={data.name} placeholder='Your Name' required />}
          
          <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Your email' required />
          <input type="password" name='password' onChange={onChangeHandler} value={data.password} placeholder='password' required />
        </div>

        <button type="submit" >{currState==="Sign Up"?"Create account":"Login"}</button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing  inn agree to the terms of use & privacy policy</p>
        </div>
        {currState==="Login"
        ?<p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>
        :<p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>
        }
      </form>

    </div>
  )
}

export default LoginPopUp