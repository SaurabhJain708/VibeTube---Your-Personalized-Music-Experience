import React from 'react'
import SongCard from './SongCard'

const SongSlide = ({heading, ids, type}) => {
 const reqids = ids.slice(20,30)
  return (
    <section className='relative w-full h-auto flex-col mt-6'>
        <p className='flex justify-start mb-3 font-extrabold text-3xl ml-3 text-green-500'>{heading}</p>
      <div className=' w-full h-auto flex items-center overflow-x-auto'>
        {reqids.map((postId)=>{
          return <SongCard key={postId} postid={postId} type={type}/>
        })}
        
      </div>
      </section>
  )
}

export default SongSlide
