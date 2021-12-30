import { Box } from "@material-ui/core";
import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const imgStyle = {
  display: "none",
  filter: "grayscale(1)" /* Microsoft Edge and Firefox 35+ */,
};
export const HeaderImg = (props: any) => {
  return (
    <Box sx={{ display: "flex", marginTop: "10px" }}>
      <React.Fragment>
        <Paper
          sx={{
            position: "relative",
            backgroundColor: "grey.800",
            color: "#000000",
            mb: 4,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundImage: `url(${props.data.imageUrl})`,
          }}
        >
          {/* Increase the priority of the hero background image */}
          {<img style={imgStyle} src={props.data.imageUrl} />}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
            }}
          />
          <Grid container>
            <Grid item md={10}>
              <Box
                sx={{
                  position: "relative",
                  p: { xs: 3, md: 6 },
                  pr: { md: 0 },
                }}
              >
                <Typography
                  component="h1"
                  variant="h3"
                  color="inherit"
                  gutterBottom
                  style={{
                    backgroundColor: "rgb(166, 166, 166,0.7)",
                  }}
                >
                  {props.data.title}
                </Typography>
                <Typography
                  style={{
                    backgroundColor: "rgb(166, 166, 166,0.7)",
                  }}
                  variant="h5"
                  color="inherit"
                  paragraph
                >
                  {props.data.description}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </React.Fragment>
    </Box>
  );
};
