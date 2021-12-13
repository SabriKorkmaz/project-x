import { Box, Divider } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import MediaCard from "../card";
import Typography from "@mui/material/Typography";
import { MeetupService } from "../../services/meetup/meetup.service";
import { ModalType } from "../create-modal/modal-type.enum";
import { ServiceService } from "../../services/service/service.service";

export default function Latest(props: any) {
  const [data, setData] = useState([] as any);
  useEffect(() => {
    let fetchData = async () => {
      let result = [];
      if (props.type === ModalType.Meetup) {
        result = await MeetupService.getLatest<any>();
      }
      if (props.type === ModalType.Service) {
        result = await ServiceService.getLatest<any>();
      }
      setData(result.data);
      console.log(result);
    };
    fetchData();
  }, []);

  let card = () => {
    if (data.length) {
      return (
        <Box sx={{ display: "flex", marginTop: "10px" }}>
          {data?.map((item: any) => {
            return <MediaCard type={props.type} data={item} />;
          })}
        </Box>
      );
    }
    return;
  };

  return (
    <React.Fragment>
      <Box
        sx={{ display: "flex", flexDirection: "column", marginTop: "100px" }}
      >
        <Typography component="h3" color="black" variant="h6">
          Latest {props.name}
        </Typography>
        <Divider variant="middle" style={{ margin: 0 }} />
        {card()}
      </Box>
    </React.Fragment>
  );
}
