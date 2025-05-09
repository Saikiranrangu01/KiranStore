import React, { useContext} from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext';
import { Link } from 'react-router-dom';

const FoodItem = ({id,name, price, description,image}) => {
    const {cartItems,addToCart, removeFromCart,url} = useContext(StoreContext);


  return (
    <div className="food-item">
        <div className="food-item-img-container">
            <img src={url+"/images/"+image} alt="" className='food-item-image' />
            {!cartItems[id]?
            <img src={assets.add_icon_white} onClick={()=>addToCart(id)} className='add'/>
            : <div className='food-item-counter-container' >
                <div className='food-item-counter'>
                  <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                  <p>{cartItems[id]}</p>
                  <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
                </div>
                <div className='food-item-link'>
                  <Link to="/cart"><button className='bag-btn'><img src={assets.bag_icon} alt="" /></button></Link>
                </div>
              
              </div>

            }
            
        </div>

        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className="food-item-desc">{description}</p>
            <p className="food-item-price">₹{price}</p>
        </div>


    </div>
  )
}

export default FoodItem