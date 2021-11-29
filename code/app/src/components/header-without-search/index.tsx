import { Box, Container } from "@material-ui/core";
import { Logo } from "../../components/logo";
/*import Profile from "../../components/auth";*/
import React from "react";
import SideBar from "../side-bar";

export default function HeaderWithoutSearch(props: any) {
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
            {/*   <Profile/>*/}
            <SideBar />
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}
