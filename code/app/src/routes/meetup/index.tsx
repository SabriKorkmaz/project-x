import React, { useEffect, useState } from "react";
import { Box, Divider } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import TableList from "../../components/table";
import { MeetupService } from "../../services/meetup/meetup.service";
import { MeetupModel } from "../../services/meetup/meetup.interface";
import { ITable } from "../../components/table/interface";
import { ResponseModel } from "../../services/base/response.interface";
import { ModalType } from "../../components/create-modal/modal-type.enum";

export const Meetups = () => {
  const [meetups, setMeetups] = useState({} as ITable);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let userId = params.get("id");
    if (userId) {
      const fetchData = async () => {
        let result = await MeetupService.getAll<ResponseModel<MeetupModel[]>>(
          parseInt(userId!)
        );
        if (result.data.length) {
          let tableData = {
            title: Object.keys(result.data[0]),
            data: result.data,
          } as ITable;
          setMeetups(tableData);
        }
      };
      fetchData();
    }
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
        <Typography
          component="h4"
          color="black"
          variant="h4"
          style={{ marginBottom: "10px" }}
        >
          My Meetups
        </Typography>
        <Divider variant="middle" style={{ margin: 0 }} />
        <TableList
          editModalType={ModalType.Meetup}
          showDeleteButton={true}
          showEditButton={true}
          data={meetups}
        />
      </Box>
    </React.Fragment>
  );
};
