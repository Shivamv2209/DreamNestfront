import React from "react";
import "../styles/List.scss";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import ListingCard from "./ListingCard";
import Footer from "./Footer";

function WishList() {
  const WishList = useSelector((state) => state.user.wishlist);
  return (
    <>
      <Navbar />
      <h1 className="title-list">Your Wish List</h1>
      <div className="list">
        {WishList.map(
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
