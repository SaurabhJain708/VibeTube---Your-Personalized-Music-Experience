import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Audio } from "react-loader-spinner";

const Layout = () => {
  return (
    <main className="App">
      <Suspense
        fallback={
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
        }
      >
        <Outlet />
      </Suspense>
    </main>
  );
};

export default Layout;
