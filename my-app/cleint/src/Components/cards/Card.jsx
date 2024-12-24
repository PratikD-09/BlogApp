
import './Cards.css'
import { Link } from 'react-router-dom'



export default function cardd({ post }) {
  const PF = "http://localhost:8000/images/"
  return (
    <>

      <div className="card cardDiv">
        {post.Photo ? 
          <img  className='cardImg'  src={PF + post.Photo} alt="CardImg" /> : <img className='cardImg' src="https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg" alt="img" /> 
          // <img src="https://via.placeholder.com/300x200" alt="Card Image" class="card-img" />
        }
        <div className="card-content">
          <div className='catogary'>{post.categeris.map((c) => (
            <span>{c.name}</span>
          ))}</div>

          <Link className="link" to={`/single/${post._id}`}><h2 className='title'>{post.title}</h2></Link>

          <div className='time'>{new Date(post.createdAt).toDateString()}</div>
          <p className='cardTxt'>{post.desc}</p>
          <Link className="link" to={`/single/${post._id}`}><button className='cardBtn' >Read More..</button></Link>
        </div>
      </div>



    </>


  )
}
