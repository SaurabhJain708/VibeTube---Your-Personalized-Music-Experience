import React from 'react'
import useSongSelector from '../../Hooks/useSongSelector'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useNavigate } from 'react-router-dom'

const SongCard = ({ postid, type }) => {
  const navigate = useNavigate()
  const { song } = useSongSelector(type, postid)
  const handleonclick=()=>{
    navigate(`/songpage/${type}/${song.id}`)
    console.log("sids",song.id)
  }

  // console.log('song',song)
  
  return (
    <div onClick={handleonclick} className="relative w-[150px] h-[180px] flex-shrink-0 bg-black ml-3 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden cursor-pointer">
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
      <article className="w-full h-[30px] absolute bottom-0 bg-slate-600 flex justify-center items-center">
        <p className="text-sm text-center text-white">{song?.title.slice(0, 10)}</p>
      </article>
    </div>
  )
}

export default SongCard
