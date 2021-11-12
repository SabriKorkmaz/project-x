import {Box, Divider} from "@material-ui/core";
import React from "react";
import MediaCard from "../card";
import Typography from "@mui/material/Typography";


export default function Latest() {
    return (
<React.Fragment>
 <Box sx={{display:"flex",flexDirection:"column"}}>
     <Typography component="h3" color="black" variant="h6">
         Latest
     </Typography>
     <Divider variant="middle" style={{margin:0}}/>
     <Box sx={{display:"flex",marginTop:"10px"}}>
         <MediaCard/>
         <MediaCard/>
         <MediaCard />
     </Box>
 </Box>

</React.Fragment>
    );
}
