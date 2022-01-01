import React from "react";
import Card from "@mui/material/Card";
import { Divider } from "@material-ui/core";

export const ProfileHeader = (props: any) => {
  return (
    <React.Fragment>
      <div className="row" style={{ marginBottom: "50px" }}>
        <div className="col-md-4">
          <div className="profile-img">
            <img
              src={props.data?.profileImg}
              style={{ height: "200px", maxWidth: "300px" }}
              alt=""
            />
          </div>
        </div>
        <Card className="col-md-8">
          <div className="profile-head">
            <div>
              <h5>Profile Details</h5>
            </div>

            <Divider />
            <h6>Name :{props.data?.name} </h6>
            <h6>Surname: {props.data?.surname} </h6>
            <h6>Email: {props.data?.email}</h6>
            <h6>Overview: {props.data?.description}</h6>
            <h6></h6>
            <p className="proile-rating"></p>
          </div>
        </Card>
      </div>
    </React.Fragment>
  );
};
