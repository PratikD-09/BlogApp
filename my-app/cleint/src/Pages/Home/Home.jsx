
import { useEffect, useState } from 'react';
import Header from '../../Components/Header/Header'
import CardsCont from '../../Components/cardsCont/CardsCont'
import Sidebar from '../../Components/sidebar/Sidebar'
import './home.css'
import axios from "axios";
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

export default function Home() {

  const[posts, setPost]=useState([]);
  const {search}=useLocation()
  

  useEffect(()=>{
    const fatchpost=async()=>{
      const res= await axios.get("/posts"+ search);
      setPost(res.data);
    } 
    fatchpost()
  },[search])
  return (
    <>
    <Header/>
    <div className='home'>
      <CardsCont posts={posts}/>
      <Sidebar/>
    </div>
    </>
    
  )
}
