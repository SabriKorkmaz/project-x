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

const ServiceDetail = observer((props: any) => {
  const [load, setLoad] = useState(false);
  const [data, setData] = useState({} as ServiceModel);
  const [owner, setOwner] = useState(false);

  const [serviceAttendees, setServiceAttendees] = useState([] as any);
  const { state } = useLocation();
  const { id } = state;
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

  let disableRequestText = () => {
    if (requestedService().exist && requestedService().status)
      return "Request is accepted";
    if (requestedService().exist && !requestedService().status)
      return "Request is waiting";
    return "Request";
  };

  let requestedService = () => {
    let result = serviceAttendees?.find(
      (k: any) => k.userId === props.user?.id
    );
    return {
      exist: result?.id !== undefined,
      status: result?.status,
      id: result?.id,
    };
  };
  let update = async () => {
    await getServiceAttendees(id);
    await MainStore.updateUser();
  };

  useEffect(() => {
    let setServiceDetail = async () => {
      let result = await ServiceService.get<ResponseModel<ServiceModel>>(id);
      setData(result.data);
      setLoad(true);
    };
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
    if (data.credit >= props.user.credit) {
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

  const acceptAction = async (id: number) => {
    let result = await UserService.acceptRegisteredService<ResponseModel<any>>(
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
    let result = await UserService.deleteRegisteredService(id);
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
        {disableRequestText()}
      </Fab>
    );
  };
  const cancelButton = () => {
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
  const handshakeButton = () => {
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
        variant="extended"
      >
        <CheckIcon sx={{ mr: 1 }} />
        Mark as completed
      </Fab>
    );
  };
  const commentButton = (data: any) => {
    console.log(data);
    return (
      <CommentModal
        type={ModalType.Service}
        data={data}
        buttonName="Submit a review"
      />
    );
  };

  const attendeeList = () => {
    if (owner) {
      return (
        <AttendeeList
          acceptAction={acceptAction}
          declineAction={declineAction}
          data={serviceAttendees}
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
          Service Detail
        </Typography>
        <Divider variant="middle" style={{ margin: 0 }} />
        <HeaderImg data={data} />
        <Card style={{ minWidth: 275, display: "flex", marginBottom: 20 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} gutterBottom>
              Owner:
              <Link
                onClick={() => {
                  navigate("/profile/detail", { state: { id: data.owner.id } });
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
          </CardContent>
        </Card>
        <DogTag data={data} type={ModalType.Service} />
        {requestButton()}
        {cancelButton()}
        {handshakeButton()}
        {commentButton(data)}
      </Box>
      {attendeeList()}
    </React.Fragment>
  );
});

export default ServiceDetail;
