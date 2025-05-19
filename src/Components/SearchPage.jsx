import React, { useEffect, useState } from "react";
import "../styles/List.scss"  
import Navbar from "./Navbar";
import ListingCard from "./ListingCard";
import { useParams } from "react-router-dom";
import {useSelector,useDispatch} from "react-redux"
import axios from "axios"
import {setListings} from "../Store/reducers/states"
import Loader from "./Loader";
import Footer from "./Footer";

function SearchPage(){
  
    const {search} = useParams()
    const listings = useSelector((state)=> state.listings )
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(true)

  const getSerach = async () =>{
    try{
     const response = await axios.get(`http://localhost:3000/list/search/${search}`)
     const data = response.data
     dispatch(setListings({listings:data}))
     setLoading(false)
    }catch(err){
        console.log(err)
    }
  }

  useEffect(()=>{
    getSerach()
  },[search])

    return loading ? <Loader /> : (
    <>
      <Navbar />
      <h1 className="title-list">{search}</h1>
      <div className="list">
        {listings.map(
          ({
            _id,
            listingPhotoPath,
            creator,
            city,
            province,
            country,
            category,
            price,
            type,
            booking = false,
          }) => (
            <ListingCard
              listingid={_id}
              creator={creator}
              listingPhotoPath={listingPhotoPath}
              city={city}
              province={province}
              price={price}
              country={country}
              category={category}
              type={type}
            />
          )
        )}
      </div>
      <Footer />
    </>
  );
}

export default SearchPage;