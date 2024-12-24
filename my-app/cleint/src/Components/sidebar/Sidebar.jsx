import { useEffect, useState } from 'react'
import './Sidebar.css'
import axios from 'axios';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default function Sidebar() {
  const[cats,setCats]=useState([]);
  useEffect(()=>{
    const getCats= async()=>{
      const res= await axios.get("/categories");
      setCats(res.data);
    }
    getCats()
  },[])
  return (
    <div className='Cont'>
        <h4>About Me</h4>
        <img src="https://i.pinimg.com/originals/b9/ff/c8/b9ffc88ad813f68a723558620ce3ff47.jpg" alt="img" />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt magni recusandae quidem repudiandae sequi dolore ratione, quisquam quia commodi, cum consectetur tenetur eum dolor nemo velit reprehenderit vel et eos!</p>
        <h4>CATEGORIES</h4>
        <div className="catlist">
          <ul>
            {cats.map(c=>(
              <Link className="link" to={`/?cat=${c.name}`}>
                <li className='luistItems' key={c}>{c.name}</li>
              </Link>
              
            ))}
          </ul>
        </div>
        <h4>FOLLOW ME</h4>
        <div className='iconsCont'>
            <i className="icons fa-brands fa-square-facebook"></i>
            <i className="icons fa-brands fa-square-instagram"></i>
            <i className="icons fa-brands fa-youtube"></i>

        </div>
        
    </div>
  )
}
