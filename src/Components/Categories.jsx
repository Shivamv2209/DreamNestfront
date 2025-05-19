import React from "react";
import {categories} from "../data"
import {Link} from "react-router-dom"
import "../styles/Categories.scss"
import Footer from "./Footer";


function Categories(){
 return (
    <>
     <div className="categories">
      <h1>Explore Top Categories</h1>
      <p>Explore your wide range of vacation rentals that cater to all types of travellers.Immerse yourself in the local culture, enjoy the comforts of home, and create unforgettable memories in your dream destination</p>
      <div className="categories_list">
        {categories?.slice(1,7).map((c,i)=>(
            
            <Link to={`/list/category/${c.label}`}>
                <div className="category" key={i}>
                    <img src={c.img} alt={c.label} />
                    <div className="overlay"></div>
                    <div className="category_text">
                        <div className="category_text_icon">{c.icon}</div>
                        <p>{c.label}</p>
                    </div>
                </div>
            </Link>
        ))}
      </div>
    </div>
    </>

 )

}

export default Categories;