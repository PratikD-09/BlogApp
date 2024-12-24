import React from 'react'
import SinglePost from '../../Components/SinglePost/SinglePost'
import Sidebar from '../../Components/sidebar/Sidebar'
import './Single.css'

export default function singleBlog() {
  return (
    <div className='postCont'>
        <SinglePost/>
        <Sidebar/>
        
    </div>
  )
}
