import React, { useEffect, useState } from "react";
import "../styles/ListingDetails.scss";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { facilities } from "../data";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import Loader from "./Loader";
import Navbar from "./Navbar"
import { useSelector } from "react-redux";
import Footer from "./Footer";

function ListingDetails() {
  const {listingid}  = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  const [dateRange, setDateRange] = useState([{
    startDate: new Date(),
    endDate: new Date(),
    key: "selection"
  }]);

  useEffect(() => {
    const getListing = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/list/${listingid}`
        );
        setListing(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getListing();
  }, [listingid]);

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const { startDate, endDate } = dateRange[0];
  const dayCount = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

  /* submit booking*/

  const customerId = useSelector((state)=>{
    return state?.user?._id
  })

  const Navigate = useNavigate();

  const handlebooking = async () =>{

    try{

      const bookingForm = {
       customerId,
       listingid,
       hostId:listing.creator._id,
       startdate:dateRange[0].startDate.toDateString(),
       enddate:dateRange[0].endDate.toDateString(),
       totalPrice:listing.price * dayCount,
      }

      const response = await axios.post(`http://localhost:3000/book/createBooking`,
        bookingForm
      )
     
      if(response.status === 200){
        Navigate(`/triplist/${customerId}/trips`)
      }
      
    }catch(err){
      console.log(err)
    }
   

  }
  

  return loading ? <Loader /> : (
    <>
    <Navbar />
    <div className="listing-details">
      <div className="title">
        <h1>{listing.title}</h1>
      </div>

      <div className="photos">
        {listing.listingPhotoPath?.map((p, i) => (
          <img
            key={i}
            src={`http://localhost:3000/${p.replace("public", "").replace(/\\/g, "/")}`}
            alt=""
          />
        ))}
      </div>

      <h2>
        {listing.type} in {listing.city}, {listing.province}, {listing.country}
      </h2>
      <p>
        {listing.guestCount} guests · {listing.bedroomCount} bedr. · {listing.bedCount} beds ·{" "}
        {listing.bathroomCount} baths
      </p>
      <hr />

      <div className="profile">
        <img
          src={`http://localhost:3000/${listing.creator.profileimage
            .replace("public", "")
            .replace(/\\/g, "/")}`}
          alt=""
        />
        <h3>
          Hosted by {listing.creator.firstname} {listing.creator.lastname}
        </h3>
      </div>
      <hr />

      <h3>Description</h3>
      <p>{listing.description}</p>
      <hr />

      <h3>{listing.highlight}</h3>
      <p>{listing.highlightdesc}</p>
      <hr />

      <div className="booking">
        <div>
          <h2>What this place offers?</h2>
          <div className="amenities">
            {listing.amenities
              .flatMap(a => a.split(","))  // if it comes as one CSV string
              .map((a, i) => (
                <div className="facility" key={i}>
                  <div className="facility_icon">
                    {facilities.find((f) => f.name === a)?.icon}
                  </div>
                  <p>{a}</p>
                </div>
              ))}
          </div>
        </div>

        <div>
          <h2>How long do you want to stay?</h2>
          <div className="date-range-calendar">
            <DateRange ranges={dateRange} onChange={handleSelect} />

            <h2>
              ${listing.price} x {dayCount} {dayCount > 1 ? "nights" : "night"}
            </h2>
            <h2>Total price: ${listing.price * dayCount}</h2>
            <p>Start Date: {startDate.toDateString()}</p>
            <p>End Date: {endDate.toDateString()}</p>

            <button className="button" onClick={handlebooking}>
              BOOK
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
    
  );
}

export default ListingDetails;
