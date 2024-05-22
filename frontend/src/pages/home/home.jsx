import React, { useState } from 'react'
import './home.css';
import Header from '../../components/header/header';
import Exploremenu from '../../components/exploremenu/exploremenu';
import Fooddisplay from '../../components/fooddisplay/fooddisplay';
import Appdownload from '../../components/appdownload/appdownload';

const Home = () => {
  const [category,setcategory]=useState("All");
  return (
    <div>
      <Header/>
      <Exploremenu category={category} setcategory={setcategory}/>
      <Fooddisplay category={category} setcategory={setcategory}/>
      <Appdownload/>
    </div>
  )
}

export default Home
