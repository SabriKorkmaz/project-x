import React from "react";
import { Box, Divider } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import TableList from "../../components/table";

export const Meetups = () => {
  return (
    <React.Fragment>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          width: "100%",
        }}
      >
        <Typography
          component="h3"
          color="black"
          variant="h3"
          style={{ marginBottom: "10px" }}
        >
          My Events
        </Typography>
        <Divider variant="middle" style={{ margin: 0 }} />
        <TableList showDeleteButton={true} showEditButton={true} />
      </Box>
    </React.Fragment>
  );
};
