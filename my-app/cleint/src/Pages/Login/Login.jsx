import React, { useContext } from 'react'
import './login.css'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import {  useRef } from "react";
import { Context } from '../../context/context';
import axios from 'axios'

export default function Login() {
    const userRef= useRef(); 
    const passwordRef= useRef()
    const {dispatch, isFatching}= useContext(Context)
    const handleSubmmit = async(e)=>{
        e.preventDefault();
        dispatch({type:"LOGIN_START"})
        try {
            const res = await axios.post("/auth/login",{
                username : userRef.current.value,
                password : passwordRef.current.value,
            })
            dispatch({type:"LOGIN_SUCCESS", paylode: res.data})
        } catch (error) {
            dispatch({type:"LOGIN_FAIL"})
        }
    
    }
    
    return (
       

        <div className='Login'>
            <button className='signBTN'><Link className='link' to='/signin'>SIGNIN</Link></button>
            <div class="mainOut">
            <h1>Login</h1>
                <div className="signup">
                    <form onSubmit={handleSubmmit}>
                        <input ref={userRef} type="text" name="txt" placeholder="User name" required="" />
                        <input ref={passwordRef} type="password" name="pswd" placeholder="Password" required="" />
                        <button className='LoginBTN' type="submit" disabled={isFatching}>Login</button>
                    </form>
                    
                </div>
            </div>
        </div>
    )
}
