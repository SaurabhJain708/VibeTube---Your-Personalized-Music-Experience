import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useFirebase } from '../../Hooks/useFirebase'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const RequireAuth = ({roles}) => {
  const {app} = useFirebase()
  const auth = getAuth(app)
  const location = useLocation()
  const [user,setUser] = useState(false)
  const [loading,setLoading] = useState(true)
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user)=>{
      if(user){
        setUser(true)
        setLoading(false)
      }else{
        setUser(false)
        setLoading(false)
      }

      return unsubscribe
    })
  },[auth])

  if(loading) return <h1>Loading</h1>
  return (
  user ? 
  <Outlet/>
  :<Navigate to={'login'} state={{from: location}} replace/>
  )
}

export default RequireAuth
