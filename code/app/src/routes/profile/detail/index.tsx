import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, Card, CardContent, Divider } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import { observer } from "mobx-react";
import { UserService } from "../../../services/user/user.service";

const ProfileDetail = observer((props: any) => {
  const { state } = useLocation();
  const { id } = state;
  useEffect(() => {
    let fetchData = async () => {
      let result = await UserService.getUser(id);
      console.log(result);
    };
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography component="h4" color="black" variant="h4">
          Meetup Detail
        </Typography>
        <Divider variant="middle" style={{ margin: 0 }} />
        <Card style={{ minWidth: 275, display: "flex", marginBottom: 20 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} gutterBottom>
              Description
            </Typography>
            <Typography sx={{ fontSize: 14 }} gutterBottom></Typography>
          </CardContent>
        </Card>
      </Box>
    </React.Fragment>
  );
});

export default ProfileDetail;
