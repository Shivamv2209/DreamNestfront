import React, { useEffect, useState } from "react";
import "../styles/List.scss";
import { useSelector,useDispatch } from "react-redux";
import Navbar from "./Navbar";
import ListingCard from "./ListingCard";
import axios from "axios"
import {setPropertyList} from "../Store/reducers/states"
import Loader from "./Loader"
import Footer from "./Footer";


function WishList() {
    const [loading,setLoading] = useState(true);
    const user = useSelector((state)=> state.user)
  const propertyList = user?.propertylist
  const dispatch = useDispatch()

 const getPropertyList = async () =>{
    try{
       const response = await axios.get(`http://localhost:3000/triplist/${user._id}/properties`)
       const data = response.data
       dispatch(setPropertyList(data))
       setLoading(false)
    }catch(err){
        console.log(err)
    }
 }

 useEffect(()=>{
    getPropertyList()
 },[])

  return loading ? <Loader /> : (
    <>
      <Navbar />
      <h1 className="title-list">Your Property List</h1>
      <div className="list">
        {propertyList.map(
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

export default WishList;
