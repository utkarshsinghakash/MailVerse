import { Box, Typography, styled, Divider } from "@mui/material";
import React from "react";

const Component = styled(Box)({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  marginTop: 50,
  opacity: 0.8,
  width: "100%",
});

const Nomails = ({ message }) => {
  return (
    <Component>
      <Typography>{message.heading}</Typography>
      <Typography>{message.subHeading}</Typography>
      <Divider style={{ width: "100%", marginTop: 10 }} />
    </Component>
  );
};

export default Nomails;
