import React from "react";
import { useParams } from "react-router-dom";
import { useGetUserByIdQuery } from "../../features/AudiusUserSlice";
import { useGetTracksbyIdQuery, useGetTracksbyUserQuery } from "../../features/AudiusSlice";
import { Audio } from "react-loader-spinner";
import SongSliderComp from "./SongSliderComp";
import SongPlayer from "./SongPlayer";

const SongPage = () => {
  const { type, id } = useParams();
  const {data:songx} = useGetTracksbyIdQuery(id)
  const userid = songx?.entities?.[id]?.user?.id
  const song = songx?.entities?.[id]
  console.log(song)

  const {
    data: user,
    isLoading,
    isSuccess,
    IsError,
    err,
  } = useGetUserByIdQuery(userid,{
    skip:!userid
  });
  const {
    data: usersongs,
    isLoading: songl,
    isSuccess: songs,
    IsError: songe,
    err: songerr,
  } = useGetTracksbyUserQuery(userid,{
    skip:!userid
  });
  if (isLoading || IsError || songl || songe)
    return (
      <div className="h-full w-full bg-gradient-to-b from-indigo-500 via-purple-400 to-pink-300 min-h-screen flex justify-center items-center ">
        <Audio
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="loading"
          wrapperStyle
          wrapperClass
        />
      </div>
    );
  return (
    <main className="relative flex flex-col items-center h-full w-full bg-gradient-to-b from-indigo-500 via-purple-400 to-pink-300 min-h-screen">
      <section className=" mt-8 rounded-2xl h-[480px] w-10/12 w-max-[480px] overflow-hidden">
        <img
          className="w-full h-full object-cover overflow-hidden"
          src={song?.artwork["480x480"]}
          alt="Error"
        />
      </section>
      <article className="w-full flex flex-col h-16 mt-4">
        <h1 className="text-white font-bold text-2xl ml-6 mr-auto">
          {song?.title.slice(0, 13)}...
        </h1>
        <h1 className="text-slate-200 ml-8 mr-auto">{user?.data?.name}</h1>
      </article>
      <section className="w-full h-32">
      <SongPlayer trackId={id}/>
      </section>
      

      <section className="rounded-2xl h-[375px] w-11/12 max-w-[480px] overflow-hidden mt-8 relative">
        <h1 className="absolute text-white font-bold ml-4 mt-4 shadow-lg ">
          About the Artist
        </h1>
        <img
          className="w-full h-[300px] object-cover object-center"
          src={user?.data?.profile_picture["480x480"]}
          alt="Error"
        />
        <div className="relative w-full h-[75px] bg-slate-800">
          <article className="w-full flex flex-col">
            <h1 className="text-white font-bold text-xl ml-6 mr-auto mt-2">
              {user?.data?.name}
            </h1>
            <h1 className="text-slate-200 ml-6 mr-auto italic">
              {user?.data?.follower_count} followers
            </h1>
          </article>
          <button className="bg-green-400 text-white absolute right-5 px-4 rounded-xl bottom-7 hover:bg-green-300">
            Visit
          </button>
        </div>
      </section>
      {songs &&<SongSliderComp songs={usersongs}/>}
      <section>

      </section> 
    </main>
  );
};

export default SongPage;
