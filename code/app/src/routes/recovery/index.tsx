//import {observer} from "mobx-react";
import {Box, Container} from "@material-ui/core";
import React from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";


//@observer
export const Recovery = (props:any) => {
    //const { setSnack } = useContext(SnackbarContext);
    return (
            <React.Fragment>
                <Container maxWidth='xl' style={{paddingTop:"100px"}}>
                    <Box sx={{display: "flex",flexDirection:"column"}}>
                        <Typography component="h3" color="black" variant="h6">
                            Recovery your password
                        </Typography>
                        <Box sx={{color: "red", display: 'flex',flexDirection:"row", flex: '50%'}} style={{justifyContent:"center"}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                        </Box>

                    </Box>
                    <Button
                        type="submit"
                        variant="contained"
                    >
                        Recovery
                    </Button>
                </Container>
            </React.Fragment>
    )
}
