import React, { useEffect, useState } from "react";
import { UserService } from "../../../services/user/user.service";
import Typography from "@mui/material/Typography";
import TableList from "../../../components/table";
import { ModalType } from "../../../components/create-modal/modal-type.enum";
import { useNavigate } from "react-router-dom";
import { ITable } from "../../../components/table/interface";
import { AttendeStatusEnum } from "../../../services/meetup/meetup.interface";
import { MeetupService } from "../../../services/meetup/meetup.service";
import { ServiceService } from "../../../services/service/service.service";

const HistoryDetail = (props: any) => {
  let bannedTitles = [
    "name",
    "handshakeStatus",
    "surname",
    "id",
    "userId",
    "serviceId",
    "meetupId",
  ];
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
        let serviceIds = result.data.services.map((k: any) => k.serviceId);
        let services = await ServiceService.getServices(serviceIds);
        if (result.data.services.length) {
          let title = Object.keys(result.data.services[0]).filter(
            (k: any) => !bannedTitles.includes(k)
          );
          let data = result.data.services?.map((k: any) => {
            k.id = k.serviceId;
            k.title = services?.data?.find(
              (s: any) => s.id == k.serviceId
            )?.title;
            k.process =
              k.status == AttendeStatusEnum.Waiting
                ? "Waiting"
                : k.status == AttendeStatusEnum.Approved
                ? "Approved"
                : "Rejected";
            return k;
          });
          title.push("process");
          title.push("title");
          let tableData = {
            title: title,
            data: data,
          } as ITable;
          setServices(tableData);
        }
        let meetupIds = result.data.meetups.map((k: any) => k.serviceId);
        let meetups = await MeetupService.getMeetups(meetupIds);
        if (result.data.meetups.length) {
          let title = Object.keys(result.data.meetups[0]).filter(
            (k) => !bannedTitles.includes(k)
          );
          title.push("process");
          title.push("title");
          let data = result.data.meetups?.map((k: any) => {
            return {
              id: k.meetupId,
              title: meetups?.data?.find((s: any) => s.id == k.meetupId)?.title,
              process:
                k.status == AttendeStatusEnum.Waiting
                  ? "Waiting"
                  : k.status == AttendeStatusEnum.Approved
                  ? "Approved"
                  : "Rejected",
            };
          });
          let tableData2 = {
            title: title,
            data: data,
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
          Meetup History
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
