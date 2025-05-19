import React, { useState,useEffect } from "react";
import Loader from "./Loader"
import "../styles/List.scss"
import Navbar from "./Navbar"
import { useParams } from "react-router-dom";
import {useSelector,useDispatch} from "react-redux"
import {setListings} from '../Store/reducers/states'
import ListingCard  from "./ListingCard";
import axios from "axios"
import Footer from "./Footer"

function CategoryPage(){
    const [loading,setLoading] = useState(true);
    const {category} = useParams()
     const listings = useSelector((state) => state.listings);
     const dispatch = useDispatch()
    const getFeedListing = async () => {
    setLoading(true);
    try {
      const url = `http://localhost:3000/list?category=${category}`;
      const response = await axios.get(url);
      dispatch(setListings({ listings: response.data }));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      getFeedListing();
    }, [category]);



    return loading ? <Loader /> : (
        <>
        <Navbar />
        <h1 className="title-list">{category} listings</h1>
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
    )
}

export default CategoryPage;