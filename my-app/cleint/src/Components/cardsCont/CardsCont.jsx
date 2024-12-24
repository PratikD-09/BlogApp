import React from 'react'
import Card from '../cards/Card'
import './CardsCont.css'


export default function CardsCont({posts}) {
  return (
    <>
      <div className='cardsCnt'>
        {posts.map((p)=>(
          <Card post={p}/>
        ))}
    </div>
    </>
  )
}
