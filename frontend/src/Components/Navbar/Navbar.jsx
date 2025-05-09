import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menu, setMenu] = useState("Home");

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("token"); //remove from local  storage
    setToken(""); //remove token from state variable
    navigate("/"); //navigate to home page
  };

  return (
    <div className="navbar">
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <Link to="/">
        <img src={assets.logo} alt="" className="logo" />
      </Link>
      <ul className={`navbar-menu ${menuOpen ? "open" : ""}`}>
        <Link to="/">
          <li
            onClick={() => {
              setMenu("Home");
            }}
            className={menu === "Home" ? "active" : ""}
          >
            Home
          </li>
        </Link>
        <Link to="/menu">
          <li
            onClick={() => {
              setMenu("menu");
            
            }}
            className={menu === "menu" ? "active" : ""}
          >
            menu
          </li>
        </Link>
        <Link to="/mobile-app">
          <li
            onClick={() => {
              setMenu("mobile-app");
          
            }}
            className={menu === "mobile-app" ? "active" : ""}
          >
            mobile-app
          </li>
        </Link>
        <Link to="/contact-us">
          <li
            onClick={() => {
              setMenu("contact-us");
             
            }}
            className={menu === "contact-us" ? "active" : ""}
          >
            contact-us
          </li>
        </Link>
      </ul>

      <div className="navbar-right">
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        
        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={()=>navigate("/myorders")}>
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logOut}>
                <img src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default Navbar;