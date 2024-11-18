import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons'; // Import specific icon
import { library } from '@fortawesome/fontawesome-svg-core';
import Sidebar from './Sidebar';
import { AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
library.add(faBars);
library.add(faUser)

const Header = () => {
  const [sidebar,setSidebar] = useState(false)
  return (
    <>
   <AnimatePresence> {sidebar && <Sidebar sidebar={setSidebar}/>}</AnimatePresence>
      <div className="bg-slate-900 justify-end w-full h-16 flex flex-row items-center sticky top-0 z-10">
        <img className='h-2/3 ml-4' src="/favicon.png" alt="Err" />
        <div className="rounded-full relative ml-auto mr-5 bg-white h-6 w-6 outline-violet-600 outline-2 outline outline-offset-2 "><Link to={'/login'}>{<FontAwesomeIcon icon="fa-solid fa-user" />}</Link></div>
        <button onClick={()=>{setSidebar(true)}}><FontAwesomeIcon className=' mr-4' icon="fa-solid fa-bars" style={{color: "#ffffff",}} /></button>
      </div>
  </>
  )
}

export default Header
