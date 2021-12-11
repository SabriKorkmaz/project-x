import { Box, Container } from "@material-ui/core";
import { Logo } from "../../components/logo";
import Auth from "../../components/auth";
import React, { useEffect } from "react";
import { IHeader } from "../header/interface";
import { SideBar } from "../side-bar";

export default function HeaderWithoutSearch(props: IHeader) {
  useEffect(() => {
    console.log("user");
    console.log(props.user);
  }, [props.user]);
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
            {props.children}
          </Box>
          <Box sx={{ display: "flex" }}>
            {props.auth ? <SideBar user={props.user} /> : <Auth />}
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}
