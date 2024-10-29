import React, { useState, useRef } from "react";
import {
  Dialog,
  Box,
  styled,
  Typography,
  InputBase,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CloseIcon from "@mui/icons-material/Close";
import MinimizeIcon from "@mui/icons-material/Minimize";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import emailjs from "@emailjs/browser";
import { EMAIL_API_ENDPOINT } from "../utils/constant";
import axios from "axios";
import { useSelector } from "react-redux";

const dialogStyle = {
  height: "80%",
  width: "90%",
  maxHeight: "100%",
  maxWidth: "100%",
  boxShadow: "none",
  borderRadius: "10px 10px 0 0",
};

const Header = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  padding: "10px 15px",
  background: "#f2f6fc",
  "&>p": {
    fontSize: 14,
    fontWeight: 500,
  },
});

const RecipientsWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  padding: "0 15px",
  "&>div": {
    fontSize: 14,
    borderRadius: "1px solid #F5F5F5",
    marginTop: 10,
  },
});

const HeaderIcons = styled(Box)({
  "&>svg": {
    marginRight: 5,
  },
  "&>svg:hover": {
    backgroundColor: "#f0f0f0",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
  },
});

const Footer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  padding: "10px 5px",
});

const SendButton = styled(Button)({
  background: "#0B57D0",
  color: "#fff",
  fontWeight: 500,
  textTransform: "none",
  borderRadius: 20,
  width: 100,
});

const ComposeMail = ({ DialogOpen, setDialogOpen }) => {
  const form = useRef();
  const { user } = useSelector((store) => store.auth);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [isloading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); //

  const closeDialog = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        to: data.to,
        from: user ? user.email : "utkarshsinghcbse96@gmail.com",
        subject: data.subject,
        body: data.body,
        date: new Date(),
        image: "",
        name: data.to,
        starred: false,
        type: "drafts",
      };

      setLoading(true);
      setResponse(null);
      setError("");
      const res = await axios.post(`${EMAIL_API_ENDPOINT}/draft`, payload, {
        withCredentials: true,
      });

      console.log(res.data.email);
      setResponse(res.data);
      if (res.data.success) {
        setDialogOpen(false);
        setData({});
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }

    setDialogOpen(false);
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      emailjs
        .sendForm(
          "service_5ha49ur",
          "template_39h3hs4",
          form.current,
          "UUo325_XfOapr5D6B"
        )
        .then(
          (result) => {
            console.log("SUCCESS!", result.text);
            setSnackbarSeverity("success");
            setSnackbarMessage("Email sent successfully!");
            setSnackbarOpen(true);
          },
          (error) => {
            console.log("FAILED...", error.text);
            setSnackbarSeverity("error");
            setSnackbarMessage("Failed to send email.");
            setSnackbarOpen(true);
          }
        );

      const payload = {
        to: data.to,
        from: user ? user.email : "utkarshsinghcbse96@gmail.com",
        subject: data.subject,
        body: data.body,
        date: new Date(),
        image: "",
        name: data.to,
        starred: false,
        type: "sent",
      };

      setLoading(true);
      setResponse(null);
      setError("");
      const res = await axios.post(`${EMAIL_API_ENDPOINT}/save`, payload, {
        withCredentials: true,
      });

      console.log(res.data.email);
      setResponse(res.data);
      if (res.data.success) {
        setDialogOpen(false);
        setData({});
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }

    setDialogOpen(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Dialog open={DialogOpen} PaperProps={{ sx: dialogStyle }}>
        <form ref={form} onSubmit={sendEmail}>
          <Header>
            <Typography>New Message</Typography>
            <HeaderIcons>
              <MinimizeIcon fontSize="small" />
              <CloseFullscreenIcon fontSize="small" />
              <CloseIcon fontSize="small" onClick={closeDialog} />
            </HeaderIcons>
          </Header>
          <RecipientsWrapper>
            <InputBase
              placeholder="Recipients"
              name="to"
              onChange={handleChange}
              required
            />
            <InputBase
              placeholder="Subject"
              name="subject"
              onChange={handleChange}
              required
            />
          </RecipientsWrapper>
          <TextField
            onChange={handleChange}
            name="body"
            multiline
            rows={15}
            sx={{ "& .MuiOutlinedInput-notchedOutline": { border: "none" } }}
            required
          />
          <input type="hidden" name="from" value={user ? user.email : ""} />

          <Footer>
            <SendButton type="submit">Send</SendButton>
            <DeleteOutlineIcon onClick={() => setDialogOpen(false)} />
          </Footer>
        </form>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ComposeMail;
