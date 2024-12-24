import React, { useContext, useState } from 'react'
import './setings.css'
import Sidebar from '../../Components/sidebar/Sidebar.jsx'
import { Context } from '../../context/context.js'
import axios from 'axios';

export default function Setings() {
    const [file, setFile] = useState();
    const [username, setusername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassward] = useState("");
    const [success, setSuccess] = useState(false);

    const { user, dispatch } = useContext(Context);
    const PF = "http://localhost:8000/images/"

    const handleDelete= async()=>{
        try {
            await axios.delete("/users/"+user._id,{
                username,
                password,
                email
              })
          window.location.replace("/")
        } catch (error){ }
      } 


    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "UPDATE_START" });
        const updatedUser = {
            userId: user._id,
            username,
            email,
            password,
        };
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            updatedUser.proImg = filename;
            try {
                await axios.post("/upload", data);
            } catch (err) { }
        }
        try {
            const res = await axios.put("/users/" + user._id, updatedUser);
            setSuccess(true);
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
        } catch (err) {
            dispatch({ type: "UPDATE_FAILURE" });
        }
    };

    return (
        <div className='setiings'>
            <div className="setWrap">
                <div className="profilPic">
                    <span className='editPro'>
                        <img
                            src={file ? URL.createObjectURL(file) : PF + user.proImg}
                            alt=""
                        /><i class="fa-regular fa-pen-to-square"></i></span>
                    <span className='deleteAc' onClick={handleDelete}><i class="fa-solid fa-user-xmark"></i>Delete Account</span>
                </div>
                <div className="updateForm">
                    <form action="submit" onSubmit={handleSubmit}>
                        <label htmlFor="fileInput1"><i class="fa-solid fa-plus addIcon"></i></label>
                        <input id='fileInput1' type="file" onChange={(e) => setFile(e.target.files[0])} style={{ display: 'none' }} />

                        <label htmlFor="text">Username</label>
                        <input type='text' placeholder={user.username} onChange={e => (setusername(e.target.value))}></input>

                        <label htmlFor="text">Email</label>
                        <input type='text' placeholder={user.email} onChange={e => (setEmail(e.target.value))}></input>

                        <label htmlFor="text">Password</label>
                        <input type='text' placeholder='***************' onChange={e => (setPassward(e.target.value))}></input>
                        <button className='upBtn' type="submit">Update</button>
                        {success ? <span className='UpdateStat'>Profile is updated</span> : <span className='UpdateStat'>Try Again</span>}
                    </form>
                </div>
            </div>
            <Sidebar />
        </div>
    )
}
