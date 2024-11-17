import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons/faEyeSlash";
import { library } from "@fortawesome/fontawesome-svg-core";
import { motion } from "framer-motion";
import { clearAlert, setAlert } from "../../features/AlertSlice";
import { useDispatch, } from "react-redux";
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import {useFirebase} from '../../Hooks/useFirebase'
library.add(faGoogle, faEyeSlash, faEye);


const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/

const Login = () => {
  const {app} = useFirebase()
  const location = useLocation()
  const passwordref = useRef()
  const [passerr,setPasserr] = useState(false)
  const [emailerr,setemailerr] = useState(false)
  const navigate = useNavigate()
  const from = location.state?.from?.pathname || '/'
    const auth = getAuth(app)
  const dispatch = useDispatch()
  const emailref = useRef();
  const [visible, setVisible] = useState(false);
  const [formval, setFormval] = useState({
    email: "",
    password: "",
    check: false,
  });

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormval((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
    if(name === 'email'){
      if(!emailRegex.test(value)){
        setemailerr(true)
      }else{
        setemailerr(false)
      }
    }
    else if(name === "password"){
      if(value.length < 8){
        setPasserr(true)
      }else{
        setPasserr(false)
      }
    }
  };

  const handlepasschange = () => {
    setVisible((prev) => !prev);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try{
      const usercred = await signInWithEmailAndPassword(auth,formval.email,formval.password)  
      console.log(usercred)
      dispatch(setAlert({type: 'success', message: 'Great', isVisible:true, timeout: true}))
      navigate(from, {replace:true})
    }catch(err){
      if(err.code === 'auth/invalid-credential'){
        dispatch(setAlert({type: 'error', message: 'Invalid Email or password', isVisible:true, timeout: true}))
      }else{
        dispatch(setAlert({type: 'error', message: err.message, isVisible:true, timeout: true}))
      }
    }
  };

  const handlegooglelogin = async ()=>{
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth,provider).then(()=>{
      navigate(from, {replace:true})
    }).catch((err)=>{
      console.log(err)
      dispatch(setAlert({type: 'error', message: err.message, isVisible:true, timeout: true}))
    })
  } 

  useEffect(() => {
    emailref && emailref.current.focus();
  }, []);
  useEffect(() => {
    dispatch(clearAlert())
  }, [formval]);

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <motion.section
        initial={{
          y: "100%",
          scale: 0,
        }}
        animate={{
          y: "0%",
          scale: 1,
        }}
        transition={{
          duration: 0.75,
          type: "spring",
        }}
        className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
        <form onSubmit={handlesubmit} className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="email"
            >
              Email
            </label>
            <input
              ref={emailref}
              type="email"
              name="email"
              id="email"
              className={`w-full px-4 py-2 mt-2 border rounded-md focus:ring-2 ${emailerr ? 'focus:ring-red-600': 'focus:ring-indigo-500'} focus:outline-none`}
              placeholder="Enter your email"
              value={formval.email}
              onChange={handleFormChange}
              required
            />
          </div>
          {emailerr && <p className="text-red-500 text-sm">*Invalid Email</p>}
          <div>
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="password"
            >
              Password
            </label>
            <input
            ref={passwordref}
              type={visible ? "text" : "password"}
              name="password"
              id="password"
              className={`w-full px-4 py-2 mt-2 border rounded-md focus:ring-2 ${passerr ? 'focus:ring-red-600' : 'focus:ring-indigo-500'} focus:outline-none`}
              placeholder="Enter your password"
              value={formval.password}
              onChange={handleFormChange}
              required
            />
            <div
              aria-label="Show password"
              onClick={handlepasschange}
              className="z-10 relative ml-auto right-4 bottom-8 cursor-pointer rounded-full hover:bg-slate-300 w-8"
            >
              {visible ? (
                <FontAwesomeIcon
                  icon="fa-solid fa-eye-slash"
                  style={{ color: "#6247b3" }}
                />
              ) : (
                <FontAwesomeIcon
                  icon="fa-solid fa-eye"
                  style={{ color: "#6247b3" }}
                />
              )}
            </div>
            {passerr && <p className="text-red-500 text-sm">*Password must be atleast 8 characters</p>}
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="check"
              id="check"
              checked={formval.check}
              required
              onChange={handleFormChange}
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor="check" className="ml-2 text-sm text-gray-600">
              I accept terms and conditions
            </label>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Log In
          </button>
        </form>

        <div className="flex items-center justify-center mt-4">
          <button
          onClick={handlegooglelogin}
            type="button"
            className="flex items-center justify-center w-full px-4 py-2 space-x-2 border rounded-md text-gray-700 border-gray-300 hover:bg-gray-50"
          >
            <FontAwesomeIcon
              icon="fa-brands fa-google"
              style={{ color: "#653be3" }}
            />
            <span>Continue with Google</span>
          </button>
        </div>

        <p className="flex justify-center items-center font-light italic mt-4">
          Don&apos;t have an account?
          <Link
            className="ml-2 underline underline-offset-2 text-blue-700"
            to="/signup"
          >
            Sign Up
          </Link>
        </p>
      </motion.section>
    </main>
  );
};

export default Login;
