import React, { Suspense, useState } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import Emails from "../components/emails";
import { Outlet } from "react-router-dom";
import SuspenseLoader from "../Error/suspenseLoader";

const main = () => {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <div>
      <Navbar toggleDrawer={toggleDrawer} />
      <Sidebar open={open} />
      <Suspense fallback={<SuspenseLoader />}>
        <Outlet context={{ open }} />
      </Suspense>
    </div>
  );
};

export default main;
