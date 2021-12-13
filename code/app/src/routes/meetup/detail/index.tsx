import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Card, CardContent, Divider, Fab } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { CircularProgress } from "@mui/material";
import { ServiceModel } from "../../../services/service/service.interface";
import { ResponseModel } from "../../../services/base/response.interface";
import { MeetupService } from "../../../services/meetup/meetup.service";
import { ModalType } from "../../../components/create-modal/modal-type.enum";
import DogTag from "../../../components/dog-tag";
import { HeaderImg } from "../../../components/header-img";
import MainStore from "../../../stores/index";
import { observer } from "mobx-react";
import { MeetupModel } from "../../../services/meetup/meetup.interface";
import { SnackbarContext } from "../../../index";
import { UserService } from "../../../services/user/user.service";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AttendeeList from "../../../components/attendee-list";

const MeetupDetail = observer((props: any) => {
  const [load, setLoad] = useState(false);
  const [data, setData] = useState({} as ServiceModel);
  const [owner, setOwner] = useState(false);

  const [meetupAttendees, setMeetupAttendees] = useState([] as any);
  const { state } = useLocation();
  const { id } = state;
  // @ts-ignore
  const { setSnack } = useContext(SnackbarContext);

  let getMeetupAttendees = async (id: number) => {
    if (props.auth) {
      let result = await UserService.getMeetupAttendees<ResponseModel<any[]>>(
        id
      );
      setMeetupAttendees(result.data);
    }
  };

  let disableRequestText = () => {
    if (requestedMeetup().exist && requestedMeetup().status)
      return "Request is accepted";
    if (requestedMeetup().exist && !requestedMeetup().status)
      return "Request is waiting";
    return "Request";
  };

  let requestedMeetup = () => {
    let result = meetupAttendees?.find((k: any) => k.userId === props.user?.id);
    return {
      exist: result?.id !== undefined,
      status: result?.status,
      id: result?.id,
    };
  };
  let update = async () => {
    await getMeetupAttendees(id);
    await MainStore.updateUser();
  };

  useEffect(() => {
    let setMeetupDetail = async () => {
      let result = await MeetupService.get<ResponseModel<ServiceModel>>(id);
      setData(result.data);
      setLoad(true);
    };
    getMeetupAttendees(id);
    setMeetupDetail();
  }, []);

  useEffect(() => {
    if (props.user) {
      if (
        props.user?.meetups?.length &&
        props.user?.meetups?.some((k: MeetupModel) => k.id === id)
      ) {
        setOwner(true);
      }
    }
  }, [props.user]);

  let cancelRequest = async () => {
    let result = await UserService.deleteRegisteredMeetup(requestedMeetup().id);
    if (result) {
      setSnack({
        message: result.message,
        open: true,
        type: result.isSuccess ? "success" : "error",
      });
    }
    if (result.isSuccess) {
      await update();
    }
  };
  let handleRequest = async (id: number) => {
    if (data.credit >= props.user.credit) {
      setSnack({
        message: "You dont have enough credits",
        open: true,
        type: "error",
      });
      return;
    }
    let result = await UserService.registerMeetup<ResponseModel<MeetupModel>>({
      userId: props.user.id,
      meetupId: id,
    });
    if (result) {
      setSnack({
        message: result.message,
        open: true,
        type: result.isSuccess ? "success" : "error",
      });
    }
    if (result.isSuccess) {
      await update();
    }
  };

  const acceptAction = async (id: number) => {
    let result = await UserService.acceptRegisteredMeetup<ResponseModel<any>>(
      id
    );
    if (result) {
      setSnack({
        message: result.message,
        open: true,
        type: result.isSuccess ? "success" : "error",
      });
    }
    await update();
  };
  const declineAction = async (id: number) => {
    let result = await UserService.deleteRegisteredMeetup(id);
    if (result) {
      setSnack({
        message: result.message,
        open: true,
        type: result.isSuccess ? "success" : "error",
      });
    }
    await update();
  };

  const requestButton = () => {
    if (!owner && props.auth)
      return (
        <Fab
          disabled={requestedMeetup().exist}
          onClick={async () => {
            await handleRequest(data.id);
          }}
          style={{
            width: "200px",
            marginTop: 20,
            fontSize: "medium",
          }}
          color={"primary"}
          variant="extended"
        >
          <AddIcon sx={{ mr: 1 }} />
          {disableRequestText()}
        </Fab>
      );
    return;
  };
  const cancelButton = () => {
    if (props.user && meetupAttendees.length) {
      if (
        !owner &&
        requestedMeetup().exist &&
        !requestedMeetup().status &&
        props.auth
      ) {
        return (
          <Fab
            onClick={async () => {
              await cancelRequest();
            }}
            style={{
              width: "200px",
              marginTop: 20,
              fontSize: "medium",
            }}
            color={"secondary"}
            variant="extended"
          >
            <DeleteForeverIcon sx={{ mr: 1 }} />
            Cancel Request
          </Fab>
        );
      }
    }
    return "";
  };

  const attendeeList = () => {
    if (owner) {
      return (
        <AttendeeList
          acceptAction={acceptAction}
          declineAction={declineAction}
          data={meetupAttendees}
        />
      );
    }
    return;
  };
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
        <HeaderImg data={data} />
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
        <DogTag data={data} type={ModalType.Meetup} />
        {requestButton()}
        {cancelButton()}
      </Box>
      {attendeeList()}
    </React.Fragment>
  );
});

export default MeetupDetail;
