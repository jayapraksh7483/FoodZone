import React, { useEffect, useState } from 'react'
import './add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
const Add = ({url}) => {
 
  const [image,setimage]=useState(false);
  const [data,setdata]=useState({
    name:"",
    description:"",
    price:"",
    category:"Salad",

  })

  const onChangehandler=(event)=>{
    const name=event.target.name;
    const value=event.target.value;
    setdata(data=>({...data,[name]:value}))
  }
  const onsubmithandler=async(event)=>{
       event.preventDefault();
       const formdata=new FormData();
       formdata.append("name",data.name)
       formdata.append("description",data.description)
       formdata.append("price",Number(data.price))
       formdata.append("category",data.category)
       formdata.append("image",image)

       const response= await axios.post(`${url}/api/food/add`,formdata);
  if(response.data.success)
    {
      setdata({
        name:"",
        description:"",
        price:"",
        category:"Salad",
    
      })
      setimage(false)
      toast.success(response.data.message);
       
    }
    else
    {
      toast.error(response.data.message)
    }

       
      
  }

  useEffect(()=>{
    console.log(data)
  },[data])
   
  
  return (
    <div className='add'>
        <form action="" onSubmit={onsubmithandler} className='flex-col'>
            <div className="add-img-upload flex-col">
            <p>Upload Image</p>
            <label htmlFor="image">
                <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
            </label>
            <input onChange={(e)=> setimage(e.target.files[0])} type="file" id='image' hidden required />
            </div>
            <div className="add-product-name flex-col">
                 <p>Product name</p>
                 <input onChange={onChangehandler} value={data.name} type="text" name="name" placeholder='Typehere'/>
            </div>

            <div className="add-product-description flex-col">
              <p>Product description</p>
              <textarea  onChange={onChangehandler} value={data.description} name="description" rows="6" placeholder='Write content here'></textarea>
            </div>

            <div className="add-category-price">
              <div className="add-category flex-col">
               <p>Product Category</p>
               <select name="category"  onChange={onChangehandler} >
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Deserts">Deserts</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pure Veg">Pure Veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>
               </select>
              </div>
              <div className="add-price flex-col">
                <p>Product price</p>
                <input onChange={onChangehandler} value={data.price} type="Number" name="price" placeholder='$20' />
              </div>
            </div>
            <button type='submit' className='add-btn'>ADD</button>
        </form>
      
    </div>
  )
}

export default Add
