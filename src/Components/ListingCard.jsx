import React, { useState } from "react";
import "../styles/ListingCard.scss";
import { ArrowForwardIos, ArrowBackIos,Favorite } from "@mui/icons-material";
import { Link } from "react-router-dom";
import {useSelector,useDispatch} from "react-redux"
import axios from "axios"
import {setWishList} from "../Store/reducers/states"


function ListingCard({
  listingid,
  creator,
  listingPhotoPath,
  city,
  province,
  country,
  category,
  type,
  price,
  booking,startdate,enddate,totalPrice,
}) {
  //slider for images

  const [slider, setSlider] = useState(0);

  const gotoprevSlide = () => {
    setSlider(
      (prevIndex) =>
        (prevIndex - 1 + listingPhotoPath.length) % listingPhotoPath.length
    );
  };

  const gotonextSlide = () => {
    setSlider((prevIndex) => (prevIndex + 1) % listingPhotoPath.length);
  };

  //wishlist
  const user = useSelector((state)=> state.user)
  const wishlist = user?.wishlist || []
  const dispatch = useDispatch();

  const isLiked = wishlist?.find((item)=> item?._id === listingid)

  const patchWishlist = async () =>{

    if(user?._id !== creator._id){
       const response = await axios.patch(`http://localhost:3000/triplist/${user?._id}/${listingid}`)
     const data = response.data
     dispatch(setWishList(data.wishlist))
    }else{
      return
    }
   } 

  return (
    
    <div className="listing-card">
      <div className="slider-container">
        <div
          className="slider"
          style={{ transform: `translateX(-${slider * 100}%)` }}
        >
          {listingPhotoPath?.map((l, i) => (
            <div className="slide" key={i}>
              <img
                src={`http://localhost:3000/${l
                  .replace("public", "")
                  .replace(/\\/g, "/")}`}
                alt={`l ${i + 1}`}
              />
              <div className="prev-button" onClick={(e) => gotoprevSlide(e)}>
                <ArrowBackIos
                  sx={{
                    fontSize: "15px",
                  }}
                />
              </div>
              <div className="next-button" onClick={(e) => gotonextSlide(e)}>
                <ArrowForwardIos
                  sx={{
                    fontSize: "15px",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Link to={`/list/${listingid}`} className="listing-card-link">
      <h3>{city}, {province}, {country}</h3>
      <p>{category}</p>

      {!booking ? <>
      <p>{type}</p>
       <p><span>${price}</span> per night</p>
      </>:(
        <>
         <p>{startdate} -{enddate}</p>
       <p><span>${totalPrice}</span> total</p>
        </>
      )}
       </Link>
       <button className="favorite" onClick={() => patchWishlist()} disabled={!user}>  
        {isLiked ? (
          <Favorite sx={{color:"red"}}/>
        ): (
          <Favorite sx={{color : "white"}} />
        )}
       </button>
    </div>
    
    
  );
}

export default ListingCard;
