import React, { useState } from "react";
import addImage from "../assets/addImage.png";
import "../styles/Register.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function RegisterPage() {
  const navigate = useNavigate();
  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(()=>{
    setPasswordMatch(formdata.password === formdata.confirmpassword || formdata.confirmpassword === "");
  })


  const [formdata, setFormdata] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    profileimage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormdata((prevData) => ({
      ...prevData,
      [name]: name === "profileimage" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const registerForm = new FormData();
      for (const key in formdata) {
        if (key !== "confirmpassword") {
          registerForm.append(key, formdata[key]);
        }
      }

      const response = await axios.post(
        "http://localhost:3000/auth/register",
        registerForm,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="register">
      <div className="register_content">
        <form className="register_content_form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            name="firstname"
            value={formdata.firstname}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastname"
            value={formdata.lastname}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formdata.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formdata.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmpassword"
            value={formdata.confirmpassword}
            onChange={handleChange}
            required
          />
          {!passwordMatch && (
            <p style={{ color: "red" }}>Passwords do not match</p>
          )}
          <input
            id="image"
            type="file"
            name="profileimage"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleChange}
            required
          />
          <label htmlFor="image">
            <img src={addImage} alt="addImage" />
            <p>Upload your Photo</p>
          </label>
          {formdata.profileimage && (
            <div className="image_preview">
              <img
                src={URL.createObjectURL(formdata.profileimage)}
                style={{ maxWidth: "80px" }}
                alt="preview"
              />
            </div>
          )}
          <button type="submit" disabled={!passwordMatch}>
            REGISTER
          </button>
        </form>
        <a href="/login">Already have an account? Login In Here</a>
      </div>
    </div>
  );
}

export default RegisterPage;
