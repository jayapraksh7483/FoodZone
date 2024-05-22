import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import './fooditem.css';
import { StoreContext } from '../../content/storecontent';

const Fooditem = ({ id, name, price, description, image }) => {
  const { cartitems, addtocart, removefromcart,url } = useContext(StoreContext);

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img className="food-item-image" src={url+"/images/"+image} alt="" />
        { !cartitems[id] 
        ?<img className="add" onClick={() => addtocart(id)} src={assets.add_icon_white} alt="" />
        :<div className="food-item-counter">
            <img onClick={() => removefromcart(id)} src={assets.remove_icon_red} alt="" />
            <p>{cartitems[id]}</p>
            <img onClick={() => addtocart(id)} src={assets.add_icon_green} alt="" />
          </div>
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">{description}</p>
        <div className="food-item-price">${price}</div>
      </div>
    </div>
  );
};

export default Fooditem;