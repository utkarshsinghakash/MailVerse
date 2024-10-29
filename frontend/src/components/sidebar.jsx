import { Drawer } from "@mui/material";
import React from "react";
import Sidebarcontent from "./sidebarcontent";

const sidebar = ({ open }) => {
  return (
    <Drawer
      anchor="left"
      open={open}
      hideBackdrop={true}
      modelprops={{ keepMounted: true }}
      variant="persistent"
      sx={{
        "& .MuiDrawer-paper": {
          marginTop: "64px",
          width: 240,
          background: "#F5F5F5",
          borderRight: "none",
          height: "calc(100vh-64px)",
        },
      }}
    >
      <Sidebarcontent />
    </Drawer>
  );
};

export default sidebar;
