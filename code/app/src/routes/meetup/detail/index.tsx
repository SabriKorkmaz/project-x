import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Card, CardContent, Divider, Fab } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import { CircularProgress } from "@mui/material";
import { ServiceModel } from "../../../services/service/service.interface";
import { ResponseModel } from "../../../services/base/response.interface";
import { MeetupService } from "../../../services/meetup/meetup.service";

const imgStyle = {
  display: "none",
  filter: "grayscale(1)" /* Microsoft Edge and Firefox 35+ */,
};
const MeetupDetail = (props: any) => {
  const [load, setLoad] = useState(false);
  const [data, setData] = useState({} as ServiceModel);
  const { state } = useLocation();
  const { id } = state;
  useEffect(() => {
    console.log(id);
    let fetchData = async () => {
      let result = await MeetupService.get<ResponseModel<ServiceModel>>(id);
      console.log(result);
      setData(result.data);
      console.log(data);
      setLoad(true);
    };
    fetchData();
  }, []);

  if (!load)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography component="h4" color="black" variant="h4">
          Meetup Detail
        </Typography>
        <Divider variant="middle" style={{ margin: 0 }} />
        <Box sx={{ display: "flex", marginTop: "10px" }}>
          <React.Fragment>
            <Paper
              sx={{
                position: "relative",
                backgroundColor: "grey.800",
                color: "#fff",
                mb: 4,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundImage: `url(${data.imageUrl})`,
              }}
            >
              {/* Increase the priority of the hero background image */}
              {<img style={imgStyle} src={data.imageUrl} />}
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
                    >
                      {data.title}
                    </Typography>
                    <Typography variant="h5" color="inherit" paragraph>
                      {data.description}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </React.Fragment>
        </Box>
        <Card style={{ minWidth: 275, display: "flex", marginBottom: 20 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} gutterBottom>
              Description
            </Typography>
            <Typography sx={{ fontSize: 14 }} gutterBottom>
              {data.description}
            </Typography>
          </CardContent>
        </Card>
        <Card style={{ minWidth: 275, display: "flex" }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 12 }}
              color="text.secondary"
              gutterBottom
            >
              Duration
            </Typography>
            <Typography
              sx={{ fontSize: 12 }}
              color="text.secondary"
              gutterBottom
            >
              Date
            </Typography>
            <Typography
              sx={{ fontSize: 12 }}
              color="text.secondary"
              gutterBottom
            >
              Capacity
            </Typography>
            <Typography
              sx={{ fontSize: 12 }}
              color="text.secondary"
              gutterBottom
            >
              Address
            </Typography>
          </CardContent>
          <CardContent>
            <Typography sx={{ fontSize: 12 }} gutterBottom>
              {data.duration}
            </Typography>
            <Typography sx={{ fontSize: 12 }} gutterBottom>
              {data.date}
            </Typography>
            <Typography sx={{ fontSize: 12 }} gutterBottom>
              {data.capacity}
            </Typography>
            <Typography sx={{ fontSize: 12 }} gutterBottom>
              {data.address}
            </Typography>
          </CardContent>
        </Card>
        <Fab
          style={{
            width: "200px",
            marginTop: 20,
            fontSize: "medium",
          }}
          color={"primary"}
          variant="extended"
        >
          <AddIcon sx={{ mr: 1 }} />
          Request
        </Fab>
      </Box>
    </React.Fragment>
  );
};

export default MeetupDetail;
