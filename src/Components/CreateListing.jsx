import React, { useState } from "react";
import Navbar from "./Navbar";
import "../styles/CreateListing.scss";
import { categories, types, facilities } from "../data";
import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
import { IoIosImages } from "react-icons/io";
import { BiTrash } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; 
import axios from "axios"
import Footer from "./Footer";

function CreateListing() {
     
    const Navigate = useNavigate();
    const [category,setCategory] = useState("");
    const [type,setType] = useState("");
  

    /* Location */

    const [formLocation,setformLocation] = useState({
        streetAddress:"",
        aptSuite:"",
        city:"",
        province:"",
        country:""
    })

    const handleChnageLocation = (e)=>{
        const {name,value} =e.target
        setformLocation({
            ...formLocation,
            [name]:value
        })
    }

    /*amenities*/
    const [amenities,setAmenities]=useState([]);

    const handleAmenities = (facility) =>{
      if(amenities.includes(facility)){
        setAmenities((prevamenities)=>{
            return prevamenities.filter((option) =>{
                return option !==facility
            })
        })
      }else{
        setAmenities((prev)=> [...prev,facility])
      }
    }

    /*description form*/
    const [descriptionform,setDescriptionForm] = useState({
        title:"",
        description:"",
        highlight:"",
        highlightdesc:"",
        price:0
    })

    const handleDescriptionForm = (e)=>{
        const {name,value} = e.target
        setDescriptionForm({
            ...descriptionform,
            [name]:value
        })
    }

    const creatorId = useSelector((state)=> state.user._id)

    const handlePost = async (e)=>{
      e.preventDefault()
    try{
     const listingForm = new FormData();
     listingForm.append("creator",creatorId)
     listingForm.append("category",category)
     listingForm.append("type",type)
     listingForm.append("streetAddress",formLocation.streetAddress)
     listingForm.append("aptSuite",formLocation.aptSuite)
     listingForm.append("city",formLocation.city)
     listingForm.append("province",formLocation.province)
     listingForm.append("country",formLocation.country)
     listingForm.append("guestCount",guests)
     listingForm.append("bedCount",beds)
     listingForm.append("bedroomCount",bedrooms)
     listingForm.append("bathroomCount",bathrooms)
     listingForm.append("amenities",amenities)
     listingForm.append("title",descriptionform.title)
     listingForm.append("description",descriptionform.description)
     listingForm.append("highlight",descriptionform.highlight)
     listingForm.append("highlightdesc",descriptionform.highlightdesc)
     listingForm.append("price",descriptionform.price)

    //append each selected photos to the FormData
    photos.forEach((p)=> listingForm.append("listingPhotoPath",p.file) )

    const response = await axios.post("http://localhost:3000/list/create",listingForm,{
           headers :{
            "Content-Type": "multipart/form-data",
           }
     })

     if(response.status === 201){
       Navigate("/")
     }

    }catch(err){
      console.log(err)
    }


    

    }
    
    

  // Photos state with id and file
  const [photos, setPhotos] = useState([]);
  const [photoIdCounter, setPhotoIdCounter] = useState(0);

  // Guest, Bedrooms, Beds, Bathrooms counts state
  const [guests, setGuests] = useState(1);
  const [bedrooms, setBedrooms] = useState(1);
  const [beds, setBeds] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);

  const handleUploadPhotos = (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = files.map((file) => ({
      id: `photo-${photoIdCounter + Math.random()}`,
      file,
    }));
    setPhotoIdCounter((prev) => prev + files.length);
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
  };

  const handleRemovePhoto = (id) => {
    setPhotos((prevPhotos) => prevPhotos.filter((p) => p.id !== id));
  };

  // Handlers to increment/decrement counts safely
  const decrement = (value, setter) => {
    if (value > 1) setter(value - 1);
  };
  const increment = (value, setter) => {
    setter(value + 1);
  };

  return (
    <>
      <Navbar />
      <div className="create-listing">
        <h1>Publish Your Place</h1>
        <form onSubmit={handlePost}>
          <div className="create-listing_step1">
            <h2>Step 1: Tell us about your place</h2>
            <hr />
            <h3>Which of these categories best describe your place?</h3>
            <div className="category-list">
              {categories?.map((c, i) => (
                <div className={`category ${category === c.label ? "selected" : "" }`} key={i} onClick={()=> setCategory(c.label)}>
                  <div className="category_icon">{c.icon}</div>
                  <p>{c.label}</p>
                </div>
              ))}
            </div>

            <h3>What type of place will the guests have?</h3>
            <div className="type-list">
              {types?.map((t, i) => (
                <div className={`type ${type === t.name ? "selected" : "" }`} key={i} onClick={()=> setType(t.name)}>
                  <div className="type_text">
                    <h4>{t.name}</h4>
                    <p>{t.description}</p>
                  </div>
                  <div className="type_icon">{t.icon}</div>
                </div>
              ))}
            </div>

            <h3>Where's your place located?</h3>
            <div className="full">
              <div className="location">
                <p>Street Address</p>
                <input
                  type="text"
                  placeholder="Street Address"
                  name="streetAddress"
                  value={formLocation.streetAddress}
                  onChange={handleChnageLocation}
                  required
                />
              </div>
            </div>
            <div className="half">
              <div className="location">
                <p>Apartment, Suites, etc. (if applicable)</p>
                <input
                  type="text"
                  placeholder="Apt, Suite, etc. (if applicable)"
                  value={formLocation.aptSuite}
                  onChange={handleChnageLocation}
                  name="aptSuite"
                />
              </div>
              <div className="location">
                <p>City</p>
                <input type="text" placeholder="City" name="city" value={formLocation.city} onChange={handleChnageLocation} required />
              </div>
            </div>
            <div className="half">
              <div className="location">
                <p>Province</p>
                <input type="text" placeholder="Province" name="province" value={formLocation.province} onChange={handleChnageLocation} required />
              </div>
              <div className="location">
                <p>Country</p>
                <input type="text" placeholder="Country" name="country" value={formLocation.country} onChange={handleChnageLocation} required />
              </div>
            </div>

            <h3>Share some basics about your place</h3>
            <div className="basics">
              <div className="basic">
                <p>Guests</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: "#F8395A" },
                    }}
                    onClick={() => decrement(guests, setGuests)}
                  />
                  <p>{guests}</p>
                  <AddCircleOutline
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: "#F8395A" },
                    }}
                    onClick={() => increment(guests, setGuests)}
                  />
                </div>
              </div>

              <div className="basic">
                <p>Bedrooms</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: "#F8395A" },
                    }}
                    onClick={() => decrement(bedrooms, setBedrooms)}
                  />
                  <p>{bedrooms}</p>
                  <AddCircleOutline
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: "#F8395A" },
                    }}
                    onClick={() => increment(bedrooms, setBedrooms)}
                  />
                </div>
              </div>

              <div className="basic">
                <p>Beds</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: "#F8395A" },
                    }}
                    onClick={() => decrement(beds, setBeds)}
                  />
                  <p>{beds}</p>
                  <AddCircleOutline
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: "#F8395A" },
                    }}
                    onClick={() => increment(beds, setBeds)}
                  />
                </div>
              </div>

              <div className="basic">
                <p>Bathrooms</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: "#F8395A" },
                    }}
                    onClick={() => decrement(bathrooms, setBathrooms)}
                  />
                  <p>{bathrooms}</p>
                  <AddCircleOutline
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: "#F8395A" },
                    }}
                    onClick={() => increment(bathrooms, setBathrooms)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="create-listing_step2">
            <h2>Step 2: Make your place stand out</h2>
            <hr />
            <h3>Tell guests what your place has to offer</h3>
            <div className="amenities" >
              {facilities?.map((f, i) => (
                <div className={`facility ${amenities.includes(f.name) ? "selected" : "" }`} key={i} onClick={()=>handleAmenities(f.name)}>
                  <div className="facility_icon">{f.icon}</div>
                  <p>{f.name}</p>
                </div>
              ))}
            </div>

            <h3>Add some photos for your place</h3>

            <div className="photos">
              {photos.length === 0 && (
                <>
                  <input
                    id="image"
                    type="file"
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleUploadPhotos}
                    multiple
                  />
                  <label htmlFor="image" className="alone">
                    <div className="icon">
                      <IoIosImages />
                    </div>
                    <p>Upload from your device</p>
                  </label>
                </>
              )}

              {photos.length > 0 && (
                <>
                  {photos.map((p) => (
                    <div className="photo" key={p.id}>
                      <img src={URL.createObjectURL(p.file)} alt="place" />
                      <button type="button" onClick={() => handleRemovePhoto(p.id)}>
                        <BiTrash />
                      </button>
                    </div>
                  ))}

                  <input
                    id="image"
                    type="file"
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleUploadPhotos}
                    multiple
                  />
                  <label htmlFor="image" className="alone">
                    <div className="icon">
                      <IoIosImages />
                    </div>
                    <p>Add more photos</p>
                  </label>
                </>
              )}
            </div>
            <h3>What makes your place attractive and exciting</h3>
            <div className="description">
                <p>Title</p>
                <input type="text" placeholder="Title" name="title" value={descriptionform.title} onChange={handleDescriptionForm} required/>
                <p>Description</p>
                <textarea name="description" placeholder="Description" value={descriptionform.description} onChange={handleDescriptionForm} required/>
                <p>Highlights</p>
                <input type="text" placeholder="Highlights" name="highlight" value={descriptionform.highlight} onChange={handleDescriptionForm} required />
                <p>Highlight Details</p>
                <textarea name="highlightdesc" placeholder="Highlight Details" value={descriptionform.highlightdesc} onChange={handleDescriptionForm} required />
                <p>Now, set your PRICE</p>
                <span>$</span>
                <input type="number" placeholder="100" name="price" className="price" value={descriptionform.price} onChange={handleDescriptionForm} required />
            </div>
          </div>
          <button className="submit_btn" type="submit">
            CREATE YOUR LISTING
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default CreateListing;
