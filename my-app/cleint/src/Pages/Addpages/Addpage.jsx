import React, { useContext, useState } from 'react'
import './addpage.css'
import axios from 'axios';
import { Context } from '../../context/context';

export default function Addpage() {
    const [title,setTitle]=useState("");
    const [desc,setDesc]=useState("");
    const [file,setFile]=useState();
    const {user}=useContext(Context);
const handleSubmit= async(e)=>{
    e.preventDefault();
    const newPost= {
         username:user.username,
         title,
         desc,
    }
    if(file){
        const data =new FormData()
        const filename= Date.now() + file.name;
        data.append("name",filename)
        data.append("file",file)
        newPost.Photo = filename;
        try {
            await axios.post("/upload",data)
        } catch (error) {}
    }
    try {
        const res= await axios.post("/posts",newPost);
        window.location.replace("/single/"+ res.data._id)
    } catch (error) {
        
    }

}
    return (
        <div className='adfileCont'>
            <div className="imgCont">
                { file && 
                 (<img className='imgCont' src={URL.createObjectURL(file)} alt="" />)
                }
            </div>
            <div className="formCont">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="fileInput"><i class="fa-solid fa-plus addIcon"></i></label>
                    <input id='fileInput' type="file" onChange={(e)=>setFile(e.target.files[0])} style={{ display: 'none' }} />
                    <input type='text' placeholder='Title' className='tiitleInput' onChange={e=>setTitle(e.target.value)}></input>
               
                    <div className='textAr'>
                        <textarea className='area'  placeholder='Write here something.....'  onChange={e=>setDesc(e.target.value)}></textarea>
                    </div>
                    <div className='publisCont' >
                    <button type="submit" className='publishBTN'>Publish</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
