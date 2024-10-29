import { Star, StarBorder } from "@mui/icons-material";
import { Box, Checkbox, Divider, styled, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/routes";
import ViewEmail from "./viewEmail";
import axios from "axios";
import { EMAIL_API_ENDPOINT } from "../utils/constant";

const Wrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
  padding: "0 0 0 10px",
  background: "#f2f6fc",
  cursor: "pointer",
  "&>div": {
    display: "flex",
    width: "100%",
    "&>p": {
      fontSize: 14,
    },
  },
});

const Indicator = styled(Typography)({
  fontSize: "12px !important",
  background: "#ddd",
  color: "#222",
  padding: "0 4px",
  borderRadius: 4,
  marginRight: 10,
});

const Date = styled(Typography)({
  marginLeft: "auto",
  marginRight: 20,
  fontSize: 12,
  color: "#5F6368",
});

const email = ({
  email,
  key,
  selectedEmails,
  setRefScreen,
  setSelectedEmails,
  type,
}) => {
  const navigate = useNavigate();

  const starredEmail = async () => {
    const data = {
      id: email._id,
      value: !email.starred,
    };
    try {
      const res = await axios.post(`${EMAIL_API_ENDPOINT}/starred`, data, {
        withCredentials: true,
      });
      setRefScreen((prev) => !prev);
    } catch (er) {
      console.log(er);
    }
  };

  const onValueChange = () => {
    let emails;
    if (selectedEmails.includes(email._id)) {
      emails = selectedEmails.filter((id) => id !== email._id);
      console.log(email);
      setSelectedEmails(emails);
    } else {
      setSelectedEmails([...selectedEmails, email._id]);
    }
  };

  return (
    <Wrapper>
      <Checkbox
        size="small"
        checked={selectedEmails.includes(email._id)}
        onChange={onValueChange}
      />

      {email.starred ? (
        <Star
          onClick={starredEmail}
          size="small"
          style={{ marginRight: 10, color: "#F8DE7E" }}
        />
      ) : (
        <StarBorder
          onClick={starredEmail}
          size="small"
          style={{ marginRight: 10 }}
        />
      )}

      <Box
        onClick={() =>
          navigate(routes.view.path, {
            state: { email: email },
          })
        }
      >
        <Typography style={{ width: 300, overflow: "hidden" }}>
          To:{email.name}
        </Typography>
        <Indicator>{type}</Indicator>
        <Typography>
          {email.subject}
          {email.body && "-"}
          {email.body ? email.body.substring(0, 20) : ""}
          {"..."}
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
    </Wrapper>
  );
};

export default email;
