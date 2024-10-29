import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import { Popover, styled, Button } from "@mui/material"; // Note the change here
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import Gmail from "../images/newgmaillogo.png";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import InputBase from "@mui/material/InputBase";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { setSearchMailByText } from "../redux/emailSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { EMAIL_API_ENDPOINT } from "../utils/constant";
import { setUser } from "../redux/authSlice";
import { toast } from "sonner";
import { Logout } from "@mui/icons-material";

// Styled components using @mui/material
const StyledAppBar = styled(AppBar)({
  background: "#F5F5F5",
  boxShadow: "none",
});

const SearchWrapper = styled(Box)({
  background: "#EAF1FB",
  marginLeft: 80,
  borderRadius: 50,
  minWidth: 690,
  maxWidth: 720,
  height: 48,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 20px",
  "& > div": {
    width: "100%",
    padding: "0 10px",
  },
});

const OptionWrapper = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "end",
  "& > svg": {
    marginLeft: 20,
  },
});

const AuthLinks = styled("div")({
  display: "flex",
  gap: "1rem",
});

const StyledLink = styled(Link)(({ theme }) => ({
  backgroundColor: "white",
  color: "#7c3aed",
  borderRadius: "9999px",
  padding: "0.5rem 1.5rem",
  textAlign: "center",
  fontWeight: 600,
  transition: "background-color 0.3s, color 0.3s",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    backgroundColor: "#7c3aed",
    color: "white",
  },
  textDecoration: "none",
}));

const ProfileBox = styled(Box)({
  display: "flex",
  alignItems: "center",
});

const StyledButton = styled(Button)({
  color: "white !important",
});

const StyledPopover = styled(Popover)({
  "& .MuiPaper-root": {
    padding: "0.8rem", // Reduced padding
    borderRadius: "0.5rem",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    minWidth: 180,
  },
});

const UserInfo = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "0.5rem",
  width: "100%",
});

const UserName = styled("h4")({
  margin: 0,
  fontSize: "1rem",
  fontWeight: 500,
  color: "#333",
});

const LogoutButton = styled(Button)({
  color: "#7c3aed !important",
  fontSize: "0.9rem",
  fontWeight: 500,
  padding: "0.4rem 0.8rem",
  borderRadius: "0.3rem",
  backgroundColor: "#f3e8ff",
  transition: "background-color 0.3s",
  "&:hover": {
    backgroundColor: "#e2d2ff",
  },
  textTransform: "none",
});

const Navbar = ({ toggleDrawer }) => {
  const [input, setInput] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${EMAIL_API_ENDPOINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data.message || "Logout failed");
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "profile-popover" : undefined;

  useEffect(() => {
    dispatch(setSearchMailByText(input));
  }, [input, dispatch]);

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <MenuIcon
          onClick={toggleDrawer}
          color="action"
          style={{ cursor: "pointer" }}
        />
        <img src={Gmail} alt="" style={{ width: 90, marginLeft: 10 }} />
        <SearchWrapper>
          <SearchIcon color="action" />
          <InputBase
            placeholder="Search Mail"
            onChange={(e) => setInput(e.target.value)}
          />
          <TuneIcon color="action" />
        </SearchWrapper>
        <OptionWrapper>
          {!user ? (
            <AuthLinks>
              <StyledLink to="/login">Login</StyledLink>
              <StyledLink to="/signup">Sign Up</StyledLink>
            </AuthLinks>
          ) : (
            <ProfileBox>
              <StyledButton onClick={handleClick}>
                <AccountCircleIcon color="action" />
              </StyledButton>
              <StyledPopover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
              >
                <UserInfo>
                  <UserName>{user?.fullname}</UserName>
                  <LogoutButton onClick={logoutHandler}>Logout</LogoutButton>
                </UserInfo>
              </StyledPopover>
            </ProfileBox>
          )}
        </OptionWrapper>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;
