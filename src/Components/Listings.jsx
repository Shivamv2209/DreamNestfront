import React, { useEffect, useState } from "react";
import "../styles/Listings.scss";
import { categories } from "../data";
import ListingCard from "./ListingCard";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setListings } from "../Store/reducers/states";
import { Link } from "react-router-dom";
import Footer from "./Footer";

function Listings() {
  const dispatch = useDispatch();
  const listings = useSelector((state) => state.listings);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");

  const getFeedListing = async () => {
    setLoading(true);
    try {
      const url = `http://localhost:3000/list${
        category !== "All" ? `?category=${category}` : ""
      }`;
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

  console.log(listings);

  return (
    <>
      <div className="category-list">
        {categories?.map((c, i) => (
          <div
            className={`category ${c.label === category ? "selected" : ""}`}
            key={i}
            onClick={() => setCategory(c.label)}
          >
            <div className="category_icon">{c.icon}</div>
            <p>{c.label}</p>
          </div>
        ))}
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="listings">
          {listings.map(
            ({
              _id,
              creator,
              listingPhotoPath,
              city,
              province,
              country,
              category,
              type,
              price,
              booking=false

            }) => (
                  <ListingCard
                listingid={_id}
                creator={creator}
                listingPhotoPath={listingPhotoPath}
                city={city}
                country={country}
                province={province}
                price={price}
                category={category}
                type={type}
                booking={booking}
              />
            )
          )}
        </div>
      )}
      <Footer />
    </>
  );
}

export default Listings;
