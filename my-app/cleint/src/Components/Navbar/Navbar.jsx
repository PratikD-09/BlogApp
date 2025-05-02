import "./Navbar.css"
import { Link } from "react-router-dom/cjs/react-router-dom.min"
import { Context } from "../../context/context"
import React, { useContext } from 'react';


export default function Navbar() {
  const PF = "http://localhost:8000/images/"
  const {user , dispatch} = useContext(Context)
  const handleLogout = ()=>{
    dispatch({type:"LOGOUT "})
  }
console.log(user);
  return (
    <div className="nav">
        
        <div className="left">
        <i className="fa-brands fa-square-facebook"></i>
        <i className="fa-brands fa-square-instagram"></i>
        <i className="fa-brands fa-youtube"></i>
        </div>
        <div className="center">
            <ul>
                <li className="navbtn"><Link className="link" to="/">HOME</Link></li>
                <li className="navbtn"><Link className="link" to="/about">ABOUT</Link></li>
                <li className="navbtn"><Link className="link" to="/contacts">CONTACTS</Link></li>
                <li className="navbtn"><Link className="link" to="/addpage">{user ? 'WRITE':""}</Link></li>
                <li className="navbtn" onClick={handleLogout}><Link className="link" to="/login">
                  {user && 'LOGOUT'}
                </Link></li>
            </ul>
        </div>
  
        <div className="right">
          {
            user ? 
            <>
            <Link className='link' to="/setings">
            <img src="https://static.vecteezy.com/system/resources/previews/036/280/651/original/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg" alt="Profile" className="navimg" /> 

            </Link>
            <i className="fa-solid fa-magnifying-glass"></i></>
            :
            <>
            <ul>
            <li className="navbtn"><Link className="link" to="/login">LOGIN</Link></li>
            <li className="navbtn"><Link className="link" to="/signin">SIGNIN</Link></li>
            </ul>
            </>

          }
            
        </div>

    </div>
  )
}
