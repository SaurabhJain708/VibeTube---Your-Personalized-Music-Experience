import React, { useMemo } from 'react'
import SongCard from './SongCard'
import { useNavigate } from 'react-router-dom'

const SongSlide = ({heading, ids, type, route}) => {
 const reqids = useMemo(()=> ids?.slice(0,10), [ids] )
 const navigate = useNavigate()
  return (
    <section className='relative w-full h-auto flex-col mt-6'>
      <button className='bg-indigo-600 p-1 rounded-2xl text-sm absolute right-5 top-2 text-white hover:bg-indigo-400' onClick={()=>navigate(route)}>See More</button>
        <p className='flex justify-start mb-3 font-extrabold text-3xl ml-3 text-green-500'>{heading}</p>
      <div className=' w-full h-auto flex items-center overflow-x-auto'>
        {reqids?.map((postId)=>{
          return <SongCard key={postId} postid={postId} type={type}/>
        })}
        
      </div>
      </section>
  )
}

export default SongSlide
