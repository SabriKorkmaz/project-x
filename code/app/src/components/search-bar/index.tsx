import SearchBar from "material-ui-search-bar";
import React from "react";
import {Box} from "@material-ui/core";
import Typography from "@mui/material/Typography";

export const Search = ()=>{
    return (
        <React.Fragment>
            <Box style={{display:"flex",flexDirection:"column",justifyContent:"start",width:"100%",marginBottom:"100px"}}>
                <Typography component="h3" color="black" variant="h6">
                    Find your interests
                </Typography>
                <SearchBar
                    onChange={() => console.log('onChange')}
                    onRequestSearch={() => console.log('onRequestSearch')}
                    style={{
                        width:"100%"
                    }}
                />
            </Box>
        </React.Fragment>


    );
}

