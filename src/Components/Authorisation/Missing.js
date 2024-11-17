import React from 'react'
import { motion } from 'framer-motion'
const Missing = () => {
  return (
    <section className="w-full h-[100vh] flex justify-center items-center bg-gradient-to-br from-violet-700 to-indigo-900">
        <motion.div
        initial={{
            y: '100%'
        }}
        animate={{
            y: '0%'
        }}
        transition={{
            duration: 0.5,
            type: 'spring'
        }}
    className='w-10/12 h-[30vh] rounded-xl outline outline-2 outline-indigo-600 bg-indigo-600 shadow-lg shadow-indigo-900'>

             <motion.p
              initial={{
                y:'-100%',
                scale: 0
            }}
            animate={{
                y:'0%',
                scale:1
            }}
            transition={{
                duration: 1,
                type: 'spring'
            }}
             className='font-extrabold text-4xl mt-14 text-white'>404 Page not</motion.p>

             <motion.p
              initial={{
                y:'-100%',
                scale: 0
            }}
            animate={{
                y:'0%',
                scale: 1
            }}
            transition={{
                duration: 1,
                type: 'spring'
            }}
             className='font-extrabold text-4xl text-white'>Found !!</motion.p>
        
      
    </motion.div>
    </section>
  )
}

export default Missing
