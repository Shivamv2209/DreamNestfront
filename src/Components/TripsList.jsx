import React, { useEffect, useState } from "react";
import "../styles/List.scss";
import Loader from "../Components/Loader";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setTripList } from "../Store/reducers/states";
import ListingCard from "./ListingCard";
import Footer from "./Footer";

function TripList() {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const tripList = user?.triplist
  const dispatch = useDispatch();

  const getTripList = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/triplist/${user._id}/trips`
      );
      const data = response.data;
      dispatch(setTripList(data));
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTripList();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list">Your Trip List</h1>
      <div className="list">
        {tripList?.map(({ listingid, startdate, enddate, totalPrice,booking=true }) => (
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

export default TripList;
