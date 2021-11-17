import {Box, Container} from "@material-ui/core";
import {Logo} from "../../components/logo";
import {Search} from "../../components/search-bar";
import Profile from "../../components/profile";
import React from "react";
export default function Header(props: any, props1: any) {

    return (
        <React.Fragment>
            <Container maxWidth='xl' style={{paddingTop: "100px"}}>
                <Box sx={{display: "flex"}}>
                    <Box sx={{}}>
                        <Logo/>
                    </Box>
                    <Box sx={{
                        color: "red",
                        display: 'flex',
                        flexDirection: "column",
                        marginLeft: "20px",
                        marginRight: "20px",
                        flex: "70%"
                    }}
                         style={{justifyContent: "start"}}>
                        <Search/>
                        {props.children}
                    </Box>
                    <Box sx={{display: 'flex'}} >

                        <Profile/>
                    </Box>
                </Box>
            </Container>
        </React.Fragment>
    );
}

