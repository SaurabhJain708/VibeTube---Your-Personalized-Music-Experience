import React from 'react'
import useSongSelector from '../../Hooks/useSongSelector'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const SongCard = ({ postid, type }) => {
  const { song } = useSongSelector(type, postid)
  console.log(song)
  return (
    <div className="relative w-[150px] h-[180px] flex-shrink-0 bg-black ml-3 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
      <LazyLoadImage
        src={song?.artwork['150x150']}
        alt="Not Found"
        className="w-full h-full object-cover rounded-t-lg"
      />
      <div className="absolute bottom-[30px] w-full px-2">
        <div className="flex items-center">
          <div className="h-6 w-[6px] bg-yellow-200"></div>
          <p className="text-white ml-2 text-sm italic">{song?.genre}</p>
        </div>
        <div className="w-full bg-yellow-200 h-1 mt-2"></div>
      </div>
      <article className="w-full h-[30px] absolute bottom-0 bg-slate-300 flex justify-center items-center">
        <p className="text-sm text-center">{song?.title.slice(0, 10)}</p>
      </article>
    </div>
  )
}

export default SongCard
