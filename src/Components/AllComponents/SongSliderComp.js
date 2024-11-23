import React from "react";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component'


const SongSliderComp = ({songs}) => {
    console.log('songs', songs)
    const navigate = useNavigate()
   const route ='//'
    const handleonclick=()=>{
        // navigate(`/songpage/${type}/${postid}`)
      }
    
  return (
    <section className="relative w-full h-auto flex-col mt-6">
      <button
        className="bg-indigo-600 p-1 rounded-2xl text-sm absolute right-5 top-2 text-white hover:bg-indigo-400"
        onClick={() => navigate(route)}
      >
        See More
      </button>
      <p className="flex justify-start mb-3 font-extrabold text-3xl ml-3 text-green-500">
        Explore Artist
      </p>
      <div className=" w-full h-auto flex items-center overflow-x-auto">
        {songs?.ids?.map((songid) => {
            const song = songs.entities[songid]
          return (
            <div
            key={song.id}
              onClick={()=>{navigate(`/songpage/trending/${song.id}`)}}
              className="relative w-[150px] h-[180px] flex-shrink-0 bg-black ml-3 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden cursor-pointer"
            >
              <LazyLoadImage
                src={song?.artwork["150x150"]}
                alt="Not Found"
                className="w-full h-full object-cover rounded-t-lg"
              />
              <div className="absolute bottom-[30px] w-full px-2">
                <div className="flex items-center">
                  <div className="h-6 w-[6px] bg-yellow-200"></div>
                  <p className="text-white ml-2 text-sm italic">
                    {song?.genre}
                  </p>
                </div>
                <div className="w-full bg-yellow-200 h-1 mt-2"></div>
              </div>
              <article className="w-full h-[30px] absolute bottom-0 bg-slate-600 flex justify-center items-center">
                <p className="text-sm text-center text-white">
                  {song?.title.slice(0, 10)}
                </p>
              </article>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SongSliderComp;
