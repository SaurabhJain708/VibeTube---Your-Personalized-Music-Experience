import React from 'react'
import useSongSelector from '../../Hooks/useSongSelector'
const SongCard = ({postid ,type}) => {
  const {song} = useSongSelector(type,postid)
  console.log(song)
  return (
    <div className='relative w-[150px] h-[180px] flex-shrink-0 bg-black ml-3'>
          <img src={song?.artwork['150x150']} alt="Not Found" />
          <div className='flex-col absolute bottom-[30px]'>
            <div className='flex w-full'>
            <div className='h-6 w-[6px] bg-yellow-200'></div>
            <p className='text-white ml-2 text-sm italic'>{song?.genre}</p>
            </div>
          <div className='w-[150px] bg-yellow-200 h-1 mt-2'></div>
          </div>
          <article className='w-full h-[30px] absolute bottom-0 bg-slate-300'>
            <p className='text'>{song?.title} </p>
            <p></p>
          </article>
        </div>
  )
}

export default SongCard
