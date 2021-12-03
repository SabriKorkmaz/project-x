import { Box, Container } from "@material-ui/core";
import { Logo } from "../../components/logo";
import { Search } from "../../components/search-bar";
import Auth from "../../components/auth";
import React from "react";
import { IHeader } from "./interface";
import SideBar from "../side-bar";
/*import SideBar from "../side-bar"*/
export default function Header(props: IHeader) {
  return (
    <React.Fragment>
      <Container maxWidth="xl" style={{ paddingTop: "100px" }}>
        <Box sx={{ display: "flex" }}>
          <Box sx={{}}>
            <Logo />
          </Box>
          <Box
            sx={{
              color: "red",
              display: "flex",
              flexDirection: "column",
              marginLeft: "20px",
              marginRight: "20px",
              flex: "70%",
            }}
            style={{ justifyContent: "start" }}
          >
            <Search />
            {props.children}
          </Box>
          <Box sx={{ display: "flex" }}>
            {props.auth ? (
              <SideBar admin={props.admin} username={props.username} />
            ) : (
              <Auth />
            )}
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}
