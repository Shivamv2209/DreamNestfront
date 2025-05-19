import React, { useState } from "react";
import logo from "../assets/logo.png"
import {IconButton} from "@mui/material"
import {Search,Person,Menu} from "@mui/icons-material"
import {useSelector,useDispatch} from "react-redux"
import "../styles/Navbar.scss"
import {Link, useNavigate} from "react-router-dom"
import { setLogout } from "../Store/reducers/states";
 function Navbar(){
  
  const [dropdownMenu,setdropdownMenu] = useState(false);
  const user = useSelector((state)=>{
   return state.user
  });

  const dispatch= useDispatch();
  const [search,setSearch] = useState("")
  const Navigate = useNavigate(); 

  return (
    <div className="navbar">
        <a href="/">
          <img src={logo} alt="logo" />
        </a>
        <div className="navbar_search">
            <input type="text" placeholder="Search ..." value={search} onChange={(e) => setSearch(e.target.value) } />
            <IconButton disabled={search === ""}>
             <Search sx={{color:"#F8395A"}} onClick={()=>{Navigate(`/list/search/${search}`)}} />
            </IconButton>
        </div>
        <div className="navbar_right">
           {user ? <a href="/create-listing" className="host">Become A Host</a> :
            <a href="/login" className="host">Become A Host</a>
           }
           <button className="navbar_right_account" onClick={()=>{
            setdropdownMenu(!dropdownMenu)
           }}>
            <Menu sx={{color: "#969393"}}/>
            {!user ? <Person sx={{color:"#969393"}} />
            : (
              <img src={`http://localhost:3000/${user.profileimage.replace("public","").replace(/\\/g, "/")}`} alt="profile photo" style={{
                objectFit: "cover ",
                borderRadius: "50%",
              }} />
              
            )  
          }
            
           </button>
           {dropdownMenu && !user && (
            <div className="navbar_right_accountmenu">
               <Link to="/login">
                Log In
               </Link>
               <Link to="/register">
                Sign Up
               </Link>
            </div>
           )}

           {dropdownMenu && user && (
            <div className="navbar_right_accountmenu">
                <Link to={`/triplist/${user._id}/trips`}>
                Trip List
               </Link>
                <Link to={`/triplist/${user._id}/wishlist`}>
                Wish List
               </Link>
                <Link to={`/triplist/${user._id}/properties`}>
                Property List
               </Link>
                <Link to={`/triplist/${user._id}/reserv`}>
                Reservation List
               </Link>

               <Link to="/login" onClick={()=>{
                dispatch(setLogout())
               }}>Log Out</Link>
               
            </div>
           )}

        </div>
    </div>
  )
}

export default Navbar;