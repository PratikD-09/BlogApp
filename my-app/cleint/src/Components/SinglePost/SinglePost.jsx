
import { useEffect, useState } from 'react';
import './SinglePost.css'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import axios from 'axios';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Context } from '../../context/context';
import { useContext } from 'react';

export default function SinglePost() {
  const PF = "http://localhost:8000/images/"
  const {user}=useContext(Context);


  const loc=useLocation();
  const path=loc.pathname.split("/")[2];
  const[post,setPost]=useState({});
  const [editMode,setEditMode] =useState(false);
  const[title,setTitle]=useState("")
  const[desc,setDisc]=useState("")
  
  useEffect(()=>{
    const getpost =async()=>{
      const res=await axios.get("/posts/"+path)
      setPost(res.data)
      setTitle(res.data.title);
      setDisc(res.data.desc)
    };
    getpost()
  },[path])


  const handleDelete= async()=>{
    try {
      axios.delete("/posts/" + path,{data :{username:user.username}})
      window.location.replace("/")
    } catch (error){ }
  } 
 const handleUpdate=async()=>{
  try {
    axios.put("/posts/" +path, {username:user.username,title,desc})
    window.location.reload()
  } catch (error){ }
 }
  
  return (
    <div className='singlepost'>
      {
        post.Photo &&(
          <div className="singleIMG">
          <img src={PF + post.Photo} alt="" />
        </div>
        )
      }
        
        {
            editMode ? 
                      <div className='headerInput'><input placeholder='Type here new Title' className='updateInput' type="text" value={title} onChange={(e)=>setTitle(e.target.value)} /></div> :
        <div className="header">
         
          <div className='heading'>
                <h2>{post.title}</h2>
          </div>
          {
            post.username===user?.username && (
              <div className='iconsdiv'>
                <span className='icons'><i class="fa-regular fa-pen-to-square edit" onClick={()=>setEditMode(true)}></i><i class="fa-solid fa-trash delete" onClick={handleDelete}></i></span>
          </div>
          ) }
        </div>
}

        <div className='AuthorTime'>
          <div className="author">Author:
            <Link className="link" to={`/?user=${post.username}`}>
            {post.username}
            </Link>
          </div>
          <div className="time">{new Date(post.createdAt).toDateString()}</div>
        </div>

          { editMode? <div className='txtD'> <textarea className='updateTextarea' value={desc} onChange={(e)=>setDisc(e.target.value)} /> </div> :
            <div className="para">
              {post.desc}
              </div>
            }
            { editMode ? <button className='UpdateBTN' onClick={handleUpdate}> Update</button> :""}
    </div>
  )
}
