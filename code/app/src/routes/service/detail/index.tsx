import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Card, CardContent, Divider, Fab } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { CircularProgress, Link } from "@mui/material";
import { ServiceModel } from "../../../services/service/service.interface";
import { ResponseModel } from "../../../services/base/response.interface";
import { ModalType } from "../../../components/create-modal/modal-type.enum";
import DogTag from "../../../components/dog-tag";
import { HeaderImg } from "../../../components/header-img";
import MainStore from "../../../stores/index";
import { observer } from "mobx-react";
import { SnackbarContext } from "../../../index";
import { UserService } from "../../../services/user/user.service";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AttendeeList from "../../../components/attendee-list";
import CheckIcon from "@mui/icons-material/Check";
import CommentModal from "../../../components/comment-modal";
import { ServiceService } from "../../../services/service/service.service";
import {
  AttendeStatusEnum,
  MeetupAttendees,
  StatusEnum,
} from "../../../services/meetup/meetup.interface";

const ServiceDetail = observer((props: any) => {
  const [load, setLoad] = useState(false);
  const [data, setData] = useState({} as ServiceModel);
  const [owner, setOwner] = useState(false);

  const [serviceAttendees, setServiceAttendees] = useState(
    [] as MeetupAttendees[]
  );
  const { state } = useLocation();
  const { id } = state as any;
  // @ts-ignore
  const { setSnack } = useContext(SnackbarContext);
  let navigate = useNavigate();

  let getServiceAttendees = async (id: number) => {
    if (props.auth) {
      let result = await UserService.getServiceAttendees<ResponseModel<any[]>>(
        id
      );
      setServiceAttendees(result.data);
    }
  };

  let requestedService = () => {
    let result = serviceAttendees?.find(
      (k: any) => k.userId === props.user?.id
    );
    console.log(result);
    return {
      exist: result?.id !== undefined,
      status: result?.status,
      handshakeStatus: result?.handshakeStatus,
      id: result?.id,
    };
  };
  let update = async () => {
    await getServiceAttendees(id);
    await setServiceDetail();
    await MainStore.updateUser();
  };

  let setServiceDetail = async () => {
    let result = await ServiceService.get<ResponseModel<ServiceModel>>(id);
    setData(result.data);
    setLoad(true);
  };

  useEffect(() => {
    if (!id) navigate("/");

    getServiceAttendees(id);
    setServiceDetail();
  }, []);

  useEffect(() => {
    if (props.user) {
      if (
        props.user?.services?.length &&
        props.user?.services?.some((k: ServiceModel) => k.id === id)
      ) {
        setOwner(true);
      }
    }
  }, [props.user]);

  let showRequestButton = () => {
    return props.auth && !owner && !requestedService().exist;
  };

  let datePassed = () => {
    let currentDate = new Date();
    let activeDate = new Date(data.date);
    activeDate.setHours(activeDate.getHours() + data.hours);
    console.log(currentDate > activeDate);
    return currentDate > activeDate;
  };

  let showCancelRequestButton =
    props.auth &&
    !owner &&
    requestedService().exist &&
    requestedService().status === AttendeStatusEnum.Waiting;

  let showHandshakeButtonForOwner =
    props.auth && owner && data.status === StatusEnum.Pending && datePassed();

  let showHandshakeButtonForAttendee =
    props.auth &&
    !owner &&
    data.status === StatusEnum.Completed &&
    requestedService().handshakeStatus === StatusEnum.Pending &&
    datePassed();

  let showCommentButton =
    props.auth &&
    !owner &&
    data.status === StatusEnum.Completed &&
    requestedService().status === AttendeStatusEnum.Approved &&
    requestedService().handshakeStatus !== StatusEnum.Pending;

  let handshakeButtonForOwnerRequest = async () => {
    let result = await ServiceService.updateStatus({
      id: data.id,
      status: StatusEnum.Completed,
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
  let handshakeButtonForAttendeeRequest = async (handshakeStatus: any) => {
    let result = await UserService.updateRegisteredService<ResponseModel<any>>({
      id: requestedService().status,
      status: requestedService().status,
      handshakeStatus: handshakeStatus,
      exchange: true,
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
  let cancelRequest = async () => {
    let result = await UserService.deleteRegisteredService(
      requestedService().id
    );
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
    if (data.hours >= props.user.credit) {
      setSnack({
        message: "You dont have enough credits",
        open: true,
        type: "error",
      });
      return;
    }
    let result = await UserService.registerService<ResponseModel<ServiceModel>>(
      {
        userId: props.user.id,
        serviceId: id,
        hours: data.hours,
      }
    );
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

  const updateAction = async (
    id: number,
    status: AttendeStatusEnum,
    handshakeStatus: AttendeStatusEnum
  ) => {
    let result = await UserService.updateRegisteredService<ResponseModel<any>>({
      id: id,
      status: status,
      handshakeStatus: handshakeStatus,
      exchange: false,
    });
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
    if (!showRequestButton()) return;
    return (
      <Fab
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
        Request
      </Fab>
    );
  };
  const cancelButton = () => {
    if (!showCancelRequestButton) return;
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
  };
  const handshakeButtonForOwner = () => {
    if (!showHandshakeButtonForOwner) return;
    return (
      <Fab
        onClick={async () => {
          await handshakeButtonForOwnerRequest();
        }}
        style={{
          width: "200px",
          marginTop: 20,
          fontSize: "medium",
        }}
        variant="extended"
      >
        <CheckIcon sx={{ mr: 1 }} />
        Mark as completed
      </Fab>
    );
  };
  const handshakeButtonForAttendee = (status: any, text: string) => {
    if (!showHandshakeButtonForAttendee) return;
    return (
      <Fab
        onClick={async () => {
          await handshakeButtonForAttendeeRequest(status);
        }}
        style={{
          width: "200px",
          marginTop: 20,
          fontSize: "medium",
        }}
        variant="extended"
      >
        <CheckIcon sx={{ mr: 1 }} />
        {text}
      </Fab>
    );
  };
  const commentButton = (data: any) => {
    if (!showCommentButton) return;
    return (
      <CommentModal
        type={ModalType.Service}
        data={data}
        buttonName="Submit a review"
      />
    );
  };

  const attendeeList = () => {
    console.log(serviceAttendees);
    if (owner) {
      return (
        <AttendeeList updateAction={updateAction} data={serviceAttendees} />
      );
    }
    return;
  };

  let status = (status: any) => {
    if (status === null || status === undefined) return "";
    if (status === AttendeStatusEnum.Waiting) {
      return (
        <Fab disabled color="secondary" aria-label="edit">
          Waiting
        </Fab>
      );
    }
    if (status === AttendeStatusEnum.Approved) {
      return (
        <Fab disabled color="secondary" aria-label="edit">
          Approved
        </Fab>
      );
    }
    if (status === AttendeStatusEnum.Rejected) {
      return (
        <Fab disabled color="secondary" aria-label="edit">
          Rejected
        </Fab>
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
          Service Detail
        </Typography>
        <Divider variant="middle" style={{ margin: 0 }} />
        <HeaderImg data={data} />
        <Card style={{ minWidth: 275, display: "flex", marginBottom: 20 }}>
          <CardContent
            style={{
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
              }}
            >
              <div>
                <Typography sx={{ fontSize: 14 }} gutterBottom>
                  Owner:
                  <Link
                    onClick={() => {
                      navigate("/profile/detail", {
                        state: { id: data.owner.id },
                      });
                    }}
                  >
                    {`${data.owner.name} ${data.owner.surname}`}
                  </Link>
                </Typography>
                <Typography sx={{ fontSize: 14 }} gutterBottom>
                  Description
                </Typography>
                <Typography sx={{ fontSize: 14 }} gutterBottom>
                  {data.description}
                </Typography>
              </div>
              <div>{status(requestedService().status)}</div>
            </div>
          </CardContent>
        </Card>
        <DogTag data={data} type={ModalType.Service} />
        {requestButton()}
        {cancelButton()}
        {handshakeButtonForOwner()}
        {handshakeButtonForAttendee(StatusEnum.Completed, "Mark as Completed")}
        {commentButton(data)}
      </Box>
      {attendeeList()}
    </React.Fragment>
  );
});

export default ServiceDetail;
