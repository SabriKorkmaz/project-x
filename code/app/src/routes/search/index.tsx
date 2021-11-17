
//import {observer} from "mobx-react";
import { Box } from "@material-ui/core";
import React from "react";
import SearchResult from "../../components/table";

//@observer
export const Search = (props:any) => {
    //const { setSnack } = useContext(SnackbarContext);
    return (
        <React.Fragment>
            <Box style={{marginTop: "20px"}}>
                <SearchResult/>
            </Box>
        </React.Fragment>
    )
}
