import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons/faEyeSlash";
import { library } from "@fortawesome/fontawesome-svg-core";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setAlert } from "../../features/AlertSlice";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useFirebase } from "../../Hooks/useFirebase";
library.add(faEye, faEyeSlash, faGoogle);

const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;

const Signup = () => {
  const { app } = useFirebase();
  const auth = getAuth(app);
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [disable, setDisable] = useState(true);
  const dispatch = useDispatch();
  const emailref = useRef();
  const location = useLocation();
  const [passerr, setPasserr] = useState(false);
  const [emailerr, setemailerr] = useState(false);
  const from = location.state?.from?.pathname || "/";
  const [formval, setFormval] = useState({
    email: "",
    password: "",
    conpass: "",
  });
  const handlepasschange = () => {
    setVisible((prev) => !prev);
  };
  const handleonchange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      if (!emailRegex.test(value)) {
        setemailerr(true);
      } else {
        setemailerr(false);
      }
    } else if (name === "password") {
      if (value.length < 8) {
        setPasserr(true);
      } else {
        setPasserr(false);
      }
    }
    setFormval((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleonsubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, formval.email, formval.password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(
          setAlert({
            type: "success",
            message: "Signed Up successfully",
            timeout: true,
            isVisible: true,
          })
        );
        navigate(from,{replace:true})
      })
      .catch((error) => {
        console.log(error)
        if(error.code === 'auth/email-already-in-use'){
          dispatch(
            setAlert({
              type: "error",
              message: 'User already exists',
              timeout: true,
              isVisible: true,
            })
          );
          navigate('/login')
        }else{
          dispatch(
            setAlert({
              type: "error",
              message: error.message,
              timeout: true,
              isVisible: true,
            })
          );
        }
      });
  };
  const handlegooglelogin = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(() => {
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          setAlert({
            type: "error",
            message: err.message,
            isVisible: true,
            timeout: true,
          })
        );
      });
  };
  useEffect(() => {
    if (emailref) emailref.current.focus();
  }, []);
  useEffect(() => {
    if (formval.password === formval.conpass) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [formval.conpass, formval.password]);
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
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Sign Up
        </h2>
        <form onSubmit={handleonsubmit} className="space-y-4">
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
              value={formval.email}
              onChange={handleonchange}
              className={`w-full px-4 py-2 mt-2 border rounded-md focus:ring-2 ${
                emailerr ? "focus:ring-red-600" : "focus:ring-indigo-500"
              } focus:outline-none`}
              placeholder="Enter your email"
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
              type={visible ? "text" : "password"}
              name="password"
              id="password"
              className={`w-full px-4 py-2 mt-2 border rounded-md focus:ring-2 ${
                passerr ? "focus:ring-red-600" : "focus:ring-indigo-500"
              } focus:outline-none`}
              placeholder="Enter your password"
              onChange={handleonchange}
              value={formval.password}
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
          </div>
          {passerr && (
            <p className="text-red-500 text-sm">
              *Password must be atleast 8 characters
            </p>
          )}
          <div>
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              type={visible ? "text" : "password"}
              name="conpass"
              id="confirmPassword"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Confirm your password"
              onChange={handleonchange}
              value={formval.conpass}
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
          </div>
          <button
            type="submit"
            disabled={disable}
            className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Sign Up
          </button>
        </form>

        {/* Continue with Google Button */}
        <div className="flex items-center justify-center mt-4">
          <button
            onClick={handlegooglelogin}
            type="button"
            className="flex items-center justify-center w-full px-4 py-2 space-x-2 border rounded-md text-gray-700 border-gray-300 hover:bg-gray-50"
          >
            <FontAwesomeIcon icon={faGoogle} style={{ color: "#653be3" }} />
            <span>Continue with Google</span>
          </button>
        </div>

        <p className="flex justify-center items-center font-light italic mt-4">
          Already have an account?
          <Link
            className="ml-2 underline underline-offset-2 text-blue-700"
            to="/login"
          >
            Login
          </Link>
        </p>
      </motion.section>
    </main>
  );
};

export default Signup;
