import React, { useState } from 'react'
import "../styles/Login.scss"
import { useDispatch } from "react-redux"
import { setLogin } from "../Store/reducers/states"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password
      });

      const loggedIn = response.data;

      if (loggedIn) {
        dispatch(setLogin({
          user: loggedIn.user,
          token: loggedIn.token
        }));

        navigate("/");
      }
    } catch (err) {
      console.log("Login error:", err.response?.data?.message || err.message);
    }
  };

  return (
    <div className='login'>
      <div className='login_content'>
        <form className='login_content_form' onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder='Email'
            name='email'
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            placeholder='Password'
            name='password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type='submit'>LOG IN</button>
          <a href="/register">Don't have an account? Sign Up Here</a>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
