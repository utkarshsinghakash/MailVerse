import { ArrowBack, Delete } from "@mui/icons-material";
import { Box, styled, Typography } from "@mui/material";
import React from "react";
import { useOutletContext, useLocation } from "react-router-dom";
import { EMAIL_API_ENDPOINT, emptyProfilePic } from "../utils/constant";
import axios from "axios";

const IconWrapper = styled(Box)({
  padding: 15,
});

const Subject = styled(Typography)({
  fontSize: 22,
  margin: "10px 0 20px 75px",
  display: "flex",
});

const Indicator = styled(Typography)({
  fontSize: "12px !important",
  background: "#ddd",
  color: "#222",
  padding: "0 4px",
  borderRadius: 4,
  marginLeft: 5,
  alignSelf: "center",
});

const Container = styled(Box)({
  marginLeft: 15,
  width: "100%",
  "&>div": {
    display: "flex",
    "&>p>span": {
      fontSize: 12,
      color: "#5E5E5E",
    },
  },
});

const Image = styled("img")({
  borderRadius: "50%",
  width: 40,
  height: 40,
  margin: "5px 10px 0 10px",
  background: "#cccccc",
});

const Date = styled(Box)({
  margin: "0 50px 0 auto",
  textSize: 14,
  color: "#5E5E5E",
});

const viewEmail = () => {
  const { state } = useLocation();
  const { email } = state;

  const { open } = useOutletContext();

  const deleteEmail = async () => {
    const id = email._id;
    console.log(id);
    try {
      const res = await axios.post(`${EMAIL_API_ENDPOINT}/bin`, [id], {
        withCredentials: true,
      });
      window.history.back();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box style={open ? { marginLeft: 240 } : { width: "100%" }}>
      <IconWrapper>
        <ArrowBack
          onClick={() => window.history.back()}
          color="action"
          fontSize="small"
          style={{ cursor: "pointer" }}
        />
        <Delete
          fontSize="small"
          color="action"
          style={{ marginLeft: 30, cursor: "pointer" }}
          onClick={deleteEmail}
        />
      </IconWrapper>
      <Subject>
        {email.subject}
        <Indicator component="span">Inbox</Indicator>
      </Subject>
      <Box style={{ display: "flex" }}>
        <Image src={emptyProfilePic} alt="" />
        <Container>
          <Box>
            <Typography style={{ marginTop: 10 }}>
              {email.name}
              <Box component="span">&nbsp;&#60;{email.to}&#62;</Box>
            </Typography>
            <Date>
              {new window.Date(email.date).toLocaleTimeString("default", {
                hour: "2-digit",
                minute: "2-digit",
              })}
              &nbsp;
              {new window.Date(email.date).getDate()}{" "}
              {new window.Date(email.date).toLocaleString("default", {
                month: "short",
              })}
            </Date>
          </Box>
          <Typography
            style={{
              marginTop: 20,
              padding: "10px 15px",
              backgroundColor: "#f1f3f4",
              borderRadius: 8,
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
              color: "#202124",
              maxWidth: "600px", // controls width
              width: "100%", // makes it responsive
              marginLeft: "auto",
              marginRight: "auto", // centers the box
            }}
          >
            {email.body}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default viewEmail;
