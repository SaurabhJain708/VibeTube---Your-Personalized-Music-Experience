import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
library.add(faUser);
library.add(faXmark);

const Sidebar = (props) => { 
  const navigate = useNavigate()

  const handleonclick = (route)=>{
    navigate(route)
    props.sidebar(false)
  }
    const sidebarref = useRef()
    useEffect(()=>{
      document.body.style.overflow = props.sidebar ? "hidden" : "auto";
        const handleclickoutside = (event)=>{if(sidebarref && !sidebarref.current.contains(event.target)) props.sidebar(false)}

        document.addEventListener("mousedown",handleclickoutside)

        return ()=>{
          document.body.style.overflow = "auto";
            document.removeEventListener("mousedown",handleclickoutside)
        }
    },[props.sidebar])
  return (
    <>
    <div
        className="fixed inset-0 bg-black bg-opacity-50 z-20"
        onClick={() => props.sidebar(false)}
      ></div>
    <motion.div
    ref={sidebarref}
    initial={{
        x: '100%'
    }}
    animate={{
        x: '0%'
    }}
    exit={{
        x: '100%'
    }}
    transition={{
        duration: 0.5,
        type: 'spring'
    }}
     className="fixed z-30 w-5/6 bg-white max-h-screen right-0 overflow-y-auto border-l-2">
      <div  className="w-full cursor-pointer hover:bg-slate-200 h-14 flex items-center mb-4">
        <button
          onClick={() => {
            props.sidebar(false);
          }}
          className="h-full w-10 z-10"
        >
          <FontAwesomeIcon icon="fa-solid fa-xmark" />
        </button>
        <div onClick={()=>{handleonclick('login')}} className="flex w-full h-full items-center">
        <div className="rounded-full relative ml-5  mr-5 bg-white h-6 w-6 outline-violet-600 outline-2 outline outline-offset-2 ">
          {<FontAwesomeIcon icon="fa-solid fa-user" />}
        </div>
        Login / Sign Up
      </div></div>
      <ul className="mb-5 w-full">
        <li onClick={()=>{handleonclick('/')}} className="cursor-pointer hover:bg-slate-200 w-full flex items-centre h-10"><p className="ml-10 flex items-center">Home</p></li>
        <li onClick={()=>{handleonclick('radio')}} className="cursor-pointer hover:bg-slate-200 w-full flex items-centre h-10"><p className="ml-10 flex items-center">Radio</p></li>
        <li onClick={()=>{handleonclick('podcasts')}} className="cursor-pointer hover:bg-slate-200 w-full flex items-centre h-10"><p className="ml-10 flex items-center">Podcast</p></li>
        <li onClick={()=>{handleonclick('reads')}} className="cursor-pointer hover:bg-slate-200 w-full flex items-centre h-10"><p className="ml-10 flex items-center">Reads</p></li>
        <li onClick={()=>{handleonclick('videos')}} className="cursor-pointer hover:bg-slate-200 w-full flex items-centre h-10"><p className="ml-10 flex items-center">Videos</p></li>
        <li onClick={()=>{handleonclick('mymusic')}} className="cursor-pointer hover:bg-slate-200 w-full flex items-centre h-10"><p className="ml-10 flex items-center">My Music</p></li>
        <li onClick={()=>{handleonclick('language')}} className="cursor-pointer hover:bg-slate-200 w-full flex items-centre h-10"><p className="ml-10 flex items-center">Language</p></li>
        <li onClick={()=>{handleonclick('')}} className="cursor-pointer hover:bg-slate-200 w-full flex items-centre h-10"><p className="ml-10 flex items-center">Night Mode</p></li>
      </ul>
      <hr />
      <div onClick={()=>{handleonclick('premium')}} className="cursor-pointer w-full h-20">
        <h3 className="mt-3 font-bold">Go Premium</h3>{" "}
        <p className="font-light mt-2">Get VibeTube Plus</p>
      </div>
      <hr />
      <ul className="mt-5 mb-5">
        <li onClick={()=>{handleonclick('trendingsongs')}} className="cursor-pointer hover:bg-slate-200 w-full flex items-centre h-10"><p className="ml-10 flex items-center">Trending Songs</p></li>
        <li onClick={()=>{handleonclick('newsongs')}} className="cursor-pointer hover:bg-slate-200 w-full flex items-centre h-10"><p className="ml-10 flex items-center">New Songs</p></li>
        <li onClick={()=>{handleonclick('oldsongs')}} className="cursor-pointer hover:bg-slate-200 w-full flex items-centre h-10"><p className="ml-10 flex items-center">Old Songs</p></li>
        <li onClick={()=>{handleonclick('album')}} className="cursor-pointer hover:bg-slate-200 w-full flex items-centre h-10"><p className="ml-10 flex items-center">Album</p></li>
        <li onClick={()=>{handleonclick('artists')}} className="cursor-pointer hover:bg-slate-200 w-full flex items-centre h-10"><p className="ml-10 flex items-center">Artists</p></li>
        <li onClick={()=>{handleonclick('lyrics')}} className="cursor-pointer hover:bg-slate-200 w-full flex items-centre h-10"><p className="ml-10 flex items-center">Lyrics</p></li>
        <li onClick={()=>{handleonclick('musiclabels')}} className="cursor-pointer hover:bg-slate-200 w-full flex items-centre h-10"><p className="ml-10 flex items-center">Music Labels</p></li>
        <li onClick={()=>{handleonclick('genres')}} className="cursor-pointer hover:bg-slate-200 w-full flex items-centre h-10"><p className="ml-10 flex items-center">Genres</p></li>
        <li onClick={()=>{handleonclick('charts')}} className="cursor-pointer hover:bg-slate-200 w-full flex items-centre h-10"><p className="ml-10 flex items-center">VibeTube charts</p></li>
        <li onClick={()=>{handleonclick('devotion')}} className="cursor-pointer hover:bg-slate-200 w-full flex items-centre h-10"><p className="ml-10 flex items-center">Devotion</p></li>
      </ul>
    </motion.div>
    </>
  );
};

export default Sidebar;
