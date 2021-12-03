import ListItem from "@mui/material/ListItem";
import { Box, Button, Card, Link } from "@material-ui/core";
import CssBaseline from "@mui/material/CssBaseline";
import Avatar from "@mui/material/Avatar";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useNavigate } from "react-router-dom";
import CreateModal from "../create-modal";
import { ModalType } from "../create-modal/modal-type.enum";
import { SessionStorageUtil } from "../../utils/session-storage.util";
import { ISideBar } from "./interface";

export default function SideBar(props: ISideBar) {
  let navigate = useNavigate();
  return (
    <Card
      component="main"
      style={{
        minWidth: "250px",
        maxHeight: "535px",
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
          <h6>{`Hi, ${props.username.toUpperCase()}`}</h6>
        </ListItem>
        <ListItem
          style={{ display: "flex", justifyContent: "center" }}
          alignItems="center"
        >
          <Link
            component="button"
            variant="h5"
            onClick={() => {
              navigate("/profile", { replace: true });
            }}
          >
            <Button variant="outlined" size="large">
              My Profile
            </Button>
          </Link>
        </ListItem>
        <ListItem
          style={{ display: "flex", justifyContent: "center" }}
          alignItems="center"
        >
          <Link
            component="button"
            variant="h4"
            onClick={() => {
              navigate("/profile/meetups", { replace: true });
            }}
          >
            <Button variant="outlined" size="large">
              My Meetps
            </Button>
          </Link>
        </ListItem>
        <ListItem
          style={{ display: "flex", justifyContent: "center" }}
          alignItems="center"
        >
          <Link
            component="button"
            variant="h4"
            onClick={() => {
              navigate("/profile/services", { replace: true });
            }}
          >
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
          <CreateModal type={ModalType.Meetup} />
        </ListItem>
        <ListItem
          style={{ display: "flex", justifyContent: "center" }}
          alignItems="center"
        >
          <Link
            component="button"
            variant="h4"
            onClick={() => {
              console.info("I'm a button.");
            }}
          >
            <CreateModal type={ModalType.Service} />
          </Link>
        </ListItem>
        <div style={{ display: props.admin ? "block" : "none" }}>
          <ListItem
            style={{ display: "flex", justifyContent: "center" }}
            sx={{ borderTop: 1 }}
            alignItems="center"
          >
            <Link
              component="button"
              variant="h4"
              onClick={() => {
                console.info("I'm a button.");
              }}
            >
              Users
            </Link>
          </ListItem>
          <ListItem
            style={{ display: "flex", justifyContent: "center" }}
            alignItems="center"
          >
            <Link
              component="button"
              variant="h4"
              onClick={() => {
                console.info("I'm a button.");
              }}
            >
              Services
            </Link>
          </ListItem>
          <ListItem
            style={{ display: "flex", justifyContent: "center" }}
            alignItems="center"
          >
            <Link
              component="button"
              variant="h4"
              onClick={() => {
                console.info("I'm a button.");
              }}
            >
              Meetups
            </Link>
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
            }}
          >
            Logout
          </Button>
        </ListItem>
      </Box>
    </Card>
  );
}
