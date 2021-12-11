import React from "react";
import { Card, CardContent } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import { IDogTag } from "./interface";
import { ModalType } from "../create-modal/modal-type.enum";

const DogTag = (props: IDogTag) => {
  let credit = () => {
    if (props.type === ModalType.Service) {
      return (
        <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
          Credit
        </Typography>
      );
    } else return "";
  };
  let creditValue = () => {
    console.log(props);
    if (props.type === ModalType.Service) {
      return (
        <Typography sx={{ fontSize: 12 }} gutterBottom>
          {props.data.credit}
        </Typography>
      );
    } else return "";
  };
  return (
    <React.Fragment>
      <Card style={{ padding: 20 }}>
        <h4>Details</h4>
        <Card style={{ minWidth: 275, display: "flex" }}>
          <CardContent>
            {credit()}
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
            {creditValue()}
            <Typography sx={{ fontSize: 12 }} gutterBottom>
              {props.data.duration}
            </Typography>
            <Typography sx={{ fontSize: 12 }} gutterBottom>
              {props.data.date}
            </Typography>
            <Typography sx={{ fontSize: 12 }} gutterBottom>
              {props.data.capacity}
            </Typography>
            <Typography sx={{ fontSize: 12 }} gutterBottom>
              {props.data.address}
            </Typography>
          </CardContent>
        </Card>
      </Card>
    </React.Fragment>
  );
};

export default DogTag;
