import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="App">
      <Suspense fallback={<h1>Loading...</h1>}>
        <Outlet />
      </Suspense>
    </main>
  );
};

export default Layout;
