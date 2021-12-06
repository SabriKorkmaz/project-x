import ListItem from "@mui/material/ListItem";
import { Box, Button, Card } from "@material-ui/core";
import CssBaseline from "@mui/material/CssBaseline";
import Avatar from "@mui/material/Avatar";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useNavigate } from "react-router-dom";
import CreateModal from "../create-modal";
import { ModalType } from "../create-modal/modal-type.enum";
import { SessionStorageUtil } from "../../utils/session-storage.util";
import { ISideBar } from "./interface";
import { Link } from "react-router-dom";

export default function SideBar(props: ISideBar) {
  let navigate = useNavigate();
  const userName = () => {
    if (props.user.name) {
      return <h6>{`Hi, ${props.user.name?.toUpperCase()}`}</h6>;
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
            style={{ display: "flex", justifyContent: "center" }}
          >
            <AccountCircleOutlinedIcon fontSize="large" />
          </Avatar>
        </ListItem>
        <ListItem style={{ display: "flex", justifyContent: "center" }}>
          {userName()}
        </ListItem>
        <ListItem
          style={{ display: "flex", justifyContent: "center" }}
          alignItems="center"
        >
          <Link to="/Profile">
            <Button variant="outlined" size="large">
              My Profile
            </Button>
          </Link>
        </ListItem>
        <ListItem
          style={{ display: "flex", justifyContent: "center" }}
          alignItems="center"
        >
          <Link to="/profile/meetups">
            <Button variant="outlined" size="large">
              My Meetps
            </Button>
          </Link>
        </ListItem>
        <ListItem
          style={{ display: "flex", justifyContent: "center" }}
          alignItems="center"
        >
          <Link to="/profile/services">
            {" "}
            <Button variant="outlined" size="large">
              My Services
            </Button>
          </Link>
        </ListItem>
        <ListItem
          style={{ display: "flex", justifyContent: "center" }}
          alignItems="center"
        >
          <CreateModal userId={props.user.id} type={ModalType.Meetup} />
        </ListItem>
        <ListItem
          style={{ display: "flex", justifyContent: "center" }}
          alignItems="center"
        >
          <CreateModal userId={props.user.id} type={ModalType.Service} />
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
}
