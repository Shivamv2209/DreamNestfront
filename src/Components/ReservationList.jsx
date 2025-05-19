import React, { useEffect, useState } from "react";
import "../styles/List.scss";
import { useSelector,useDispatch } from "react-redux";
import Navbar from "./Navbar";
import ListingCard from "./ListingCard";
import axios from "axios"
import {setReservationList} from "../Store/reducers/states"
import Loader from "./Loader"
import Footer from "./Footer";


function ReservationList() {
    const [loading,setLoading] = useState(true);
    const user = useSelector((state)=> state.user)
  const reservationList = user?.reservationlist
  const dispatch = useDispatch()

 const getReservationList = async () =>{
    try{
       const response = await axios.get(`http://localhost:3000/triplist/${user._id}/reserv`)
       const data = response.data
       dispatch(setReservationList(data))
       setLoading(false)
    }catch(err){
        console.log(err)
    }
 }

 useEffect(()=>{
    getReservationList()
 },[])

 return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list">Your Reservation List</h1>
      <div className="list">
        {reservationList?.map(({ listingid, startdate, enddate, totalPrice,booking=true }) => (
          <ListingCard
            listingid={listingid._id}
            creator={listingid.creator}
            listingPhotoPath={listingid.listingPhotoPath}
            city={listingid.city}
            province={listingid.province}
            country={listingid.country}
            category={listingid.category}
            startdate={startdate}
            enddate={enddate}
            totalPrice={totalPrice}
            booking={booking}
          />
        ))}
      </div>
      <Footer />
    </>
  );
}

export default ReservationList;
