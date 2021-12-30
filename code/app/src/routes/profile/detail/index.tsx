import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { observer } from "mobx-react";
import { UserService } from "../../../services/user/user.service";
import Typography from "@mui/material/Typography";
import { Box, Divider } from "@material-ui/core";
import { ProfileHeader } from "../../../components/profile/header";
import { RecentJobs } from "../../../components/profile/recent-jobs";
import UpdateProfile from "..";

const ProfileDetail = observer((props: any) => {
  const { state } = useLocation();
  const { id } = state;
  const [result, setResult] = useState({} as any);
  useEffect(() => {
    let fetchData = async () => {
      let result = await UserService.getUser<any>(id);
      setResult(result);
      console.log(result);
    };
    fetchData();
  }, []);

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
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Typography component="h4" color="black" variant="h4">
            Profile
          </Typography>

          <UpdateProfile data={result?.data} />
        </div>
        <Divider variant="middle" style={{ margin: 0 }} />
      </Box>
      <div style={{ marginTop: "50px" }} className="container emp-profile">
        <ProfileHeader data={result.data} />
        <div className="row">
          <RecentJobs data={result.data} />
          <div className="col-md-8"></div>
        </div>
      </div>
    </React.Fragment>
  );
});

export default ProfileDetail;
