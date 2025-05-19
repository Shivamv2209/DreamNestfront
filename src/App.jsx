import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage";
import LoginPage from "./Components/LoginPage";
import RegisterPage from "./Components/RegisterPage";
import CreateListing from "./Components/CreateListing";
import ListingDetails from "./Components/ListingDetails";
import TripList from "./Components/TripsList";
import WishList from "./Components/WishList";
import PropertyList from "./Components/PropertyList";
import ReservationList from "./Components/ReservationList";
import CategoryPage from "./Components/CategoryPage";
import SearchPage from "./Components/SearchPage";
function App(){
return (
  <div>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/create-listing" element={<CreateListing />} />
      <Route path="/list/:listingid" element={<ListingDetails />} />
      <Route path="/list/category/:category" element={<CategoryPage />} />
      <Route path="/list/search/:search" element={<SearchPage />} />
      <Route path="/triplist/:userId/trips" element={<TripList />} />
      <Route path="/triplist/:userId/wishlist" element={<WishList />} />
      <Route path="/triplist/:userId/properties" element={<PropertyList />} />
      <Route path="/triplist/:userId/reserv" element={<ReservationList />} />
    </Routes>
    
  </div>
)


}

export default App;