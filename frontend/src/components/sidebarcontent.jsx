import React, { useState } from "react";
import { Box, Button, styled } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import CreateIcon from "@mui/icons-material/Create";
import { SIDEBAR_DATA } from "../config/sidebar.config";
import ComposeMail from "./ComposeMail";
import { useParams, NavLink } from "react-router-dom";
import { routes } from "../routes/routes";
import { useSelector } from "react-redux";

const Container = styled(Box)({
  padding: 8,
  "&>ul": {
    padding: "10px 0 0 5px",
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    "&>a": {
      textDecoration: "none",
      color: "inherit",
    },
  },
  "&>ul>a>li>svg": {
    marginRight: 20,
  },
});

const ComposeButton = styled(Button)({
  background: "#c2e7ff",
  color: "#001d35",
  padding: 15,
  borderRadius: 16,
  minWidth: 140,
  textTransform: "none",
  //   marginLeft: 30,
  //   marginTop: 10,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-evenly",
});

const sidebarcontent = () => {
  const { type } = useParams();
  const [DialogOpen, setDialogOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const openDialogbox = () => {
    if (user) {
      setDialogOpen(true);
    } else {
      navigate(routes.login.path);
    }
  };

  return (
    <Container>
      <ComposeButton onClick={openDialogbox}>
        <CreateIcon />
        Compose
      </ComposeButton>
      <List>
        {SIDEBAR_DATA.map((data) => (
          <NavLink key={data.name} to={`${routes.emails.path}/${data.name}`}>
            <ListItem
              style={
                type === data.name.toLowerCase()
                  ? {
                      backgroundColor: "#d3e3fd",
                      borderRadius: "0 16px 16px 0",
                    }
                  : {}
              }
            >
              <data.icon />
              {data.title}
            </ListItem>
          </NavLink>
        ))}
      </List>
      <ComposeMail DialogOpen={DialogOpen} setDialogOpen={setDialogOpen} />
    </Container>
  );
};

export default sidebarcontent;
