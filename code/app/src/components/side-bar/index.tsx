import ListItem from "@mui/material/ListItem";
import { Box, Button, Card } from "@material-ui/core";
import CssBaseline from "@mui/material/CssBaseline";
import Avatar from "@mui/material/Avatar";
import { Link, useNavigate } from "react-router-dom";
import CreateModal from "../create-modal";
import { ModalType } from "../create-modal/modal-type.enum";
import { SessionStorageUtil } from "../../utils/session-storage.util";
import { ISideBar } from "./interface";
import { ProcessType } from "../../utils/process-type.enum";
import { useEffect } from "react";
import MainStore from "../../stores";
import { observer } from "mobx-react";

export const SideBar = observer((props: ISideBar) => {
  let navigate = useNavigate();
  const userName = () => {
    if (props.user.name) {
      return <h6>{`Hi, ${props.user.name?.toUpperCase()}`}</h6>;
    }
    return;
  };

  useEffect(() => {}, [props.user]);
  const credit = () => {
    if (MainStore.getUser()) {
      return <h6>{`Credit: ${MainStore.getUser().credit}`}</h6>;
    }
    return;
  };

  return (
    <Card
      component="main"
      style={{
        minWidth: "250px",
        height: "535px",
        marginTop: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "sticky",
        top: 0,
      }}
    >
      <Box style={{ display: "flex", height: "100%", flexDirection: "column" }}>
        <CssBaseline />
        <ListItem
          style={{ display: "flex", justifyContent: "center" }}
          alignItems="center"
        >
          <Avatar
            sx={{ m: 1 }}
            src={props.user.profileImg}
            style={{ display: "flex", justifyContent: "center" }}
          />
        </ListItem>
        <ListItem style={{ display: "flex", justifyContent: "center" }}>
          {userName()}
        </ListItem>
        <ListItem style={{ display: "flex", justifyContent: "center" }}>
          {credit()}
        </ListItem>
        <ListItem
          style={{ display: "flex", justifyContent: "center" }}
          alignItems="center"
        >
          <Button
            component="button"
            variant="outlined"
            onClick={() => {
              navigate("/profile/detail", { state: { id: props.user.id } });
            }}
          >
            My Profile
          </Button>
        </ListItem>
        <ListItem
          style={{ display: "flex", justifyContent: "center" }}
          alignItems="center"
        >
          <Link to={`/profile/meetups?id=` + props.user.id}>
            <Button variant="outlined" size="large">
              My Meetps
            </Button>
          </Link>
        </ListItem>
        <ListItem
          style={{ display: "flex", justifyContent: "center" }}
          alignItems="center"
        >
          <Link to={`/profile/services?id=` + props.user.id}>
            <Button variant="outlined" size="large">
              My Services
            </Button>
          </Link>
        </ListItem>
        <ListItem
          style={{ display: "flex", justifyContent: "center" }}
          alignItems="center"
        >
          <Link to={`/profile/history?id=` + props.user.id}>
            <Button variant="outlined" size="large">
              History
            </Button>
          </Link>
        </ListItem>
        <ListItem
          style={{ display: "flex", justifyContent: "center" }}
          alignItems="center"
        >
          <CreateModal
            userId={props.user.id}
            type={ModalType.Meetup}
            buttonName="Create Meetup"
            mode={ProcessType.Create}
          />
        </ListItem>
        <ListItem
          style={{ display: "flex", justifyContent: "center" }}
          alignItems="center"
        >
          <CreateModal
            buttonName="Create Service"
            userId={props.user.id}
            type={ModalType.Service}
            mode={ProcessType.Create}
          />
        </ListItem>
        <div style={{ display: props.user.admin ? "block" : "none" }}>
          <ListItem
            style={{ display: "flex", justifyContent: "center" }}
            sx={{ borderTop: 1 }}
            alignItems="center"
          >
            <Link to="/admin/users">Users</Link>
          </ListItem>
          <ListItem
            style={{ display: "flex", justifyContent: "center" }}
            alignItems="center"
          >
            <Link to="/admin/services">Services</Link>
          </ListItem>
          <ListItem
            style={{ display: "flex", justifyContent: "center" }}
            alignItems="center"
          >
            <Link to="/admin/meetups">Meetups</Link>
          </ListItem>
        </div>
        <ListItem
          style={{ display: "flex", justifyContent: "center" }}
          alignItems="center"
        >
          <Button
            component="button"
            variant="outlined"
            onClick={() => {
              SessionStorageUtil.clear();
              navigate("/", { replace: true });
              window.location.reload();
            }}
          >
            Logout
          </Button>
        </ListItem>
      </Box>
    </Card>
  );
});
