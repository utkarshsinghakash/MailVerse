import { Box, Typography } from "@mui/material";
import React from "react";
import { useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <Box>
      <Typography> There was an error loading this page</Typography>
    </Box>
  );
};

export default Error;
