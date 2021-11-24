
//import {observer} from "mobx-react";
import { Box } from "@material-ui/core";
import React from "react";
import TableList from "../../components/table";

//@observer
export const Search = (props:any) => {
    //const { setSnack } = useContext(SnackbarContext);
    return (
        <React.Fragment>
            <Box style={{marginTop: "20px"}}>
                < TableList/>
            </Box>
        </React.Fragment>
    )
}

