import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets.js'

const ExploreMenu = ({category, setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore our menu</h1>
        <p className='explore-menu-text'>Explore our diverse menu, featuring a mouthwatering selection of dishes crafted with the freshest ingredients. Whether you're craving crispy snacks, hearty meals, or refreshing beverages, we've got something for everyone.</p>
        <div className="explore-menu-list">
            {menu_list.map((item,index)=>{
                return (
                    <div onClick = {()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)}   key={index} className="explore-menu-list-item">
                        <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                        <p>{item.menu_name}</p>

                    </div>
                )
            })}
        </div>
        <hr />
    </div>
  )
}

export default ExploreMenu