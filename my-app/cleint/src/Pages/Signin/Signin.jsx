import React, { useState } from 'react'
import './signin.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import axios from 'axios';

export default function Signin() {
  
  const[username,setUsername]= useState("");
  const[password,SetPassword]= useState("");
  const[email,setEmail]= useState("");
  const[error,setError]= useState(false);
  

  const handleSubmit = async(e)=>{
    e.preventDefault();
    setError(false);
    try {
      const res =await axios.post("/auth/register",{
        username,
        password,
        email
      });
      res.data && window.location.replace("/login")
    } catch (error) {
      setError(true)
    }
   
  }

  return (
    
    <div className='bodyOut'>
      <button className='loginBTN'><Link className='link' to='/login'>LOGIN</Link></button>
    <div class="mainOut">
    <h1>Sign up</h1>
        <div className="signup">
            <form onSubmit={handleSubmit}>
                <input type="text" name="txt" placeholder="User name" required=""onChange={e=>setUsername(e.target.value)} />
                <input type="email" name="email" placeholder="Email" required="" onChange={e=>setEmail(e.target.value)} />
                <input type="password" name="pswd" placeholder="Password" required="" onChange={e=>SetPassword(e.target.value)} />
                <button className='LoginBTN' type="submit">Sign up</button>
                {error && <span style={{color:"red", marginLeft:"10px"}}>Username is already taken or Email is used !!!</span>}
            </form>
        </div>
    </div>
</div>
  )
}
