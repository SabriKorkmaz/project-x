import React, { useEffect, useState } from "react";
import { UserService } from "../../../services/user/user.service";
import Typography from "@mui/material/Typography";
import TableList from "../../../components/table";
import { ModalType } from "../../../components/create-modal/modal-type.enum";
import { useNavigate } from "react-router-dom";
import { ITable } from "../../../components/table/interface";
import { AttendeStatusEnum } from "../../../services/meetup/meetup.interface";

const HistoryDetail = (props: any) => {
  let bannedTitles = ["name", "handshakeStatus", "surname", "id", "userId"];
  let navigate = useNavigate();
  const [services, setServices] = useState({} as ITable);
  const [meetups, setMeetups] = useState({} as ITable);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let userId = params.get("id");
    if (!userId) return navigate("/");

    if (userId !== null) {
      let fetchData = async () => {
        let result = await UserService.getHistory<any>(parseInt(userId!));
        if (result.data.services.length) {
          let tableData = {
            title: Object.keys(result.data.services[0]).filter(
              (k: any) => !bannedTitles.includes(k)
            ),
            data: result.data.services?.map((k: any) => {
              k.status =
                k.status == AttendeStatusEnum.Waiting
                  ? "Waiting"
                  : k.status == AttendeStatusEnum.Approved
                  ? "Approved"
                  : "Rejected";
              return k;
            }),
          } as ITable;
          setServices(tableData);
        }
        if (result.data.meetups.length) {
          let tableData2 = {
            title: Object.keys(result.data.meetups[0]).filter(
              (k) => !bannedTitles.includes(k)
            ),
            data: result.data.meetups?.map((k: any) => {
              k.status =
                k.status == AttendeStatusEnum.Waiting
                  ? "Waiting"
                  : k.status == AttendeStatusEnum.Approved
                  ? "Approved"
                  : "Rejected";
              return k;
            }),
          } as ITable;
          setMeetups(tableData2);
        }
      };
      fetchData();
    }
  }, []);

  return (
    <React.Fragment>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Typography
          component="h2"
          variant="h6"
          color="primary"
          style={{ margin: 10 }}
          gutterBottom
        >
          Meetups History
        </Typography>
        <TableList type={ModalType.Meetup} data={meetups} />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Typography
          component="h2"
          variant="h6"
          color="primary"
          style={{ margin: 10 }}
          gutterBottom
        >
          Service History
        </Typography>
        <TableList type={ModalType.Service} data={services} />
      </div>
    </React.Fragment>
  );
};

export default HistoryDetail;
