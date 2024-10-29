import axios from "axios";
import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { EMAIL_API_ENDPOINT, EMPTY_TABS } from "../utils/constant";
import { Box, Checkbox, Divider, List, styled } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import Email from "./email";
import Nomails from "./Nomails";
import { useSelector } from "react-redux";

const OptionWrapper = styled(Box)({
  padding: "20px 10px 0 10px ",
  display: "flex",
  alignItems: "center",
});

const emails = () => {
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [refScreen, setRefScreen] = useState(false);
  const { open } = useOutletContext();
  const { type } = useParams();
  const [emailRes, setEmailRes] = useState();
  const { searchMailByText } = useSelector((store) => store.email);

  useEffect(() => {
    const getEmailByType = async () => {
      try {
        const res = await axios.get(`${EMAIL_API_ENDPOINT}/email/${type}`, {
          withCredentials: true,
        });
        setEmailRes(res.data.emails);
      } catch (err) {
        console.log(err);
      }
    };
    getEmailByType();
  }, [type, refScreen]);

  const [filterEmail, setfilterEmail] = useState(emailRes);

  useEffect(() => {
    const filteredEmails =
      emailRes?.length >= 0 &&
      emailRes.filter((email) => {
        if (!searchMailByText) return true;
        return (
          email?.name?.toLowerCase().includes(searchMailByText.toLowerCase()) ||
          email?.from?.toLowerCase().includes(searchMailByText.toLowerCase()) ||
          email?.subject
            ?.toLowerCase()
            .includes(searchMailByText.toLowerCase()) ||
          email?.body?.toLowerCase().includes(searchMailByText.toLowerCase())
        );
      });
    setfilterEmail(filteredEmails);
  }, [emailRes, searchMailByText]);

  const selectEmails = (e) => {
    if (e.target.checked) {
      const emails = emailRes.map((email) => email._id);
      setSelectedEmails(emails);
    } else {
      setSelectedEmails([]);
    }
  };

  const deleteSelectedEmails = async () => {
    if (type === "bin") {
      try {
        const res = await axios.post(
          `${EMAIL_API_ENDPOINT}/delete`,
          selectedEmails,
          { withCredentials: true }
        );
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const res = await axios.post(
          `${EMAIL_API_ENDPOINT}/bin`,
          selectedEmails,
          { withCredentials: true }
        );
      } catch (err) {
        console.log(err);
      }
    }
    setRefScreen((prevState) => !prevState);
  };

  return (
    <Box
      style={
        open
          ? { marginLeft: 240, width: "calc(100%-240px)" }
          : { width: "calc(100%-240px)" }
      }
    >
      <OptionWrapper>
        <Checkbox
          size="small"
          style={{ cursor: "pointer" }}
          onChange={selectEmails}
        />
        <DeleteOutline
          style={{ cursor: "pointer" }}
          onClick={deleteSelectedEmails}
        />
      </OptionWrapper>
      <List>
        {filterEmail &&
          filterEmail.map((email) => (
            <Box>
              <Email
                email={email}
                key={email._id}
                selectedEmails={selectedEmails}
                setRefScreen={setRefScreen}
                setSelectedEmails={setSelectedEmails}
                type={type}
              />
              <Divider style={{ width: "100%" }} />
            </Box>
          ))}
      </List>
      {filterEmail?.length == 0 && <Nomails message={EMPTY_TABS[type]} />}
    </Box>
  );
};

export default emails;
