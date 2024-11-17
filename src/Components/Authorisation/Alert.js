import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faExclamationCircle,
  faTimesCircle,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { clearAlert, selectAlert } from "../../features/AlertSlice";
library.add(
  faCheckCircle,
  faExclamationCircle,
  faInfoCircle,
  faTimes,
  faTimesCircle
);

const Alert = () => {
  const { type, message } = useSelector(selectAlert);
  const dispatch = useDispatch();

  const geticon = () => {
    switch (type) {
      case "success":
        return faCheckCircle;
      case "error":
        return faTimesCircle;
      case "warning":
        return faExclamationCircle;
      default:
        return faInfoCircle;
    }
  };

  const getcss = () => {
    switch (type) {
      case "success":
        return "bg-green-100 text-green-700 border-green-300";
      case "error":
        return "bg-red-100 text-red-700 border-red-300";
      case "warning":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      default:
        return "bg-blue-100 text-blue-700 border-blue-300";
    }
  };
  return (
    <motion.div
      initial={{
        y: "-100%",
      }}
      animate={{
        y: "0%",
      }}
      exit={{
        y: "-100%",
      }}
      transition={{
        duration: 0.5,
        type: "spring",
      }}
      className={`flex items-center justify-center p-4 border rounded-lg absolute top-0 ${getcss()} shadow-md z-40 w-full`}
    >
      <FontAwesomeIcon icon={geticon()} className="mr-3 text-xl" />
      <span className="flex-grow">{message}</span>
      <button
        onClick={() => dispatch(clearAlert())}
        className="ml-4 text-gray-500 hover:text-gray-700"
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </motion.div>
  );
};

export default Alert;
