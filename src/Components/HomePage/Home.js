import React, { useEffect, useState } from "react";
import Header from "./Header";
import useSongCard from "../../Hooks/useSongCard";
import { Audio } from 'react-loader-spinner';


const Home = () => {
  const { content: TrendingSongs } = useSongCard("trending");
  const { content: NewSongs } = useSongCard("NewSongs");
  const { content: AllSongs } = useSongCard("AllSongs");
  const { content: OldSongs } = useSongCard("OldSongs");
  const [loader,setLoader] = useState(false)

  useEffect(()=>{
    if(TrendingSongs !== "Loading" && NewSongs !== "Loading" && AllSongs !== "Loading" && OldSongs !== "Loading"){
      setLoader(false)
    }else{
      setLoader(true)
    }
  },[TrendingSongs,NewSongs,AllSongs,OldSongs])
  if(loader) return <div className="h-full w-full bg-gradient-to-b from-indigo-500 via-purple-400 to-pink-300 min-h-screen flex justify-center items-center ">
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
  return (
    <>
      <main className="relative inset-0 h-auto w-full bg-gradient-to-b from-gray-900 via-purple-800 to-purple-900 min-h-screen">
        <Header />
        {TrendingSongs}
        {NewSongs}
        {AllSongs}
        {OldSongs}
      </main>
    </>
  );
};

export default Home;
