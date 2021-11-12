//import {observer} from "mobx-react";
import {Box, Container} from "@material-ui/core";
import {Logo} from "../../components/logo";
import {Search} from "../../components/search-bar";
import SignIn from "../../components/sign-in";
import React from "react";
import Latest from "../../components/latest";
import Footer from "../../components/footer";



//@observer
export const Home = () => {
    //const { setSnack } = useContext(SnackbarContext);
    return (
            <React.Fragment>
                <Container maxWidth='xl' style={{paddingTop:"100px"}}>
                    <Box sx={{display: "flex"}}>
                        <Box sx={{color: "red", display: 'flex', flex: '10%'}}>
                            <Logo/>
                        </Box>
                        <Box sx={{color: "red", display: 'flex',flexDirection:"column", flex: '50%'}} style={{justifyContent:"center"}}>
                            <Search/>
                            <Latest/>
                        </Box>
                        <Box sx={{color: "red", display: 'flex', flex: '10%'}}>
                            <SignIn/>
                        </Box>
                    </Box>
                    <Footer/>

                </Container>
            </React.Fragment>
    )
}
