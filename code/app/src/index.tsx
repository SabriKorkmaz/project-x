import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { createTheme, Snackbar } from "@material-ui/core";
import { AlertProps, ThemeProvider } from "@mui/material";
import Latest from "./components/latest";
import Header from "./components/header";
import { Search } from "./routes/search";
import { Recovery } from "./routes/recovery";
import HeaderWithoutSearch from "./components/header-without-search";
import { Services } from "./routes/service";
import { Meetups } from "./routes/meetup";
import { useEffect, useState } from "react";
import MuiAlert from "@mui/material/Alert";
import { SessionStorageUtil } from "./utils/session-storage.util";
import MainStore from "./stores/index";
import { observer } from "mobx-react";
import { createContext } from "react";
import React from "react";
import { AlertColor } from "@mui/material/Alert/Alert";
import { Navigate } from "react-router-dom";
import { UserModel } from "./services/user/user.inteface";
import MeetupDetail from "./routes/meetup/detail";
import ServiceDetail from "./routes/service/detail";
import { ModalType } from "./components/create-modal/modal-type.enum";
import ProfileDetail from "./routes/profile/detail";
import HistoryDetail from "./routes/profile/history";

export const SnackbarContext = createContext({});
let isAuth = () => {
  return SessionStorageUtil.getItem("auth") === "true";
};
const ProfileLayout = (props: any) => {
  return (
    <HeaderWithoutSearch auth={props.auth} user={props.user}>
      <Routes>
        <Route
          path="/detail"
          element={<ProfileDetail auth={props.auth} user={props.user} />}
        />
        <Route path="/history" element={<HistoryDetail />} />
        <Route path="/services" element={<Services />} />
        <Route path="/meetups" element={<Meetups />} />
      </Routes>
    </HeaderWithoutSearch>
  );
};
const ProtectedLayout = (props: any) => {
  if (!MainStore.getUser().admin) {
    return (
      <Navigate
        to={{
          pathname: "/",
        }}
      />
    );
  }

  return (
    <HeaderWithoutSearch auth={props.auth} user={props.user}>
      <Route path="/users" element={<Recovery />} />
      <Route path="/services" element={<Recovery />} />
      <Route path="/meetups" element={<Recovery />} />
    </HeaderWithoutSearch>
  );
};
const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#e0e0e0",
      paper: "#ffffff",
    },
  },
});
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const App = () => {
  const [snack, setSnack] = useState({
    message: "",
    type: "success" as AlertColor,
    open: false,
  });
  const handleClose = () => {
    setSnack((prevState) => ({
      open: false,
      type: prevState.type,
      message: prevState.message,
    }));
  };
  return (
    <SnackbarContext.Provider value={{ snack, setSnack }}>
      <Snackbar
        transitionDuration={200}
        autoHideDuration={3000}
        open={snack.open}
        onClose={handleClose}
        message={snack.message}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          sx={{ width: "100%" }}
          style={{
            display: "flex",
            fontSize: 16,
            justifyContent: "center",
            alignContent: "center",
          }}
          elevation={6}
          severity={snack.type}
        >
          {snack.message}
        </Alert>
      </Snackbar>
      <React.Fragment>
        <AllRoute />
      </React.Fragment>
    </SnackbarContext.Provider>
  );
};

const AllRoute = observer(() => {
  let auth = isAuth();
  let [user, setUser] = useState({} as UserModel);
  useEffect(() => {
    let userString = SessionStorageUtil.getItem("user");
    if (userString) {
      user = JSON.parse(userString ?? "");
      setUser(user);
    }
    MainStore.setAuth(auth);
    MainStore.setUser(user);
  }, []);

  return (
    <div style={{ paddingBottom: 200 }}>
      <Routes>
        <Route
          path="/"
          element={
            <Header user={user} auth={auth}>
              <Latest type={ModalType.Service} name="Services" />
              <Latest type={ModalType.Meetup} name="Meetups" />
            </Header>
          }
        />
        <Route
          path="/search"
          element={
            <Header user={user} auth={auth}>
              <Search />
            </Header>
          }
        />
        <Route
          path="/recovery"
          element={
            <Header user={user} auth={auth}>
              <Recovery />
            </Header>
          }
        />
        <Route
          element={
            <HeaderWithoutSearch auth={auth} user={user}>
              <MeetupDetail auth={auth} user={user} />
            </HeaderWithoutSearch>
          }
          path="/meetup/detail"
        />
        <Route
          path="/service/detail"
          element={
            <HeaderWithoutSearch auth={auth} user={user}>
              <ServiceDetail auth={auth} user={user} />
            </HeaderWithoutSearch>
          }
        />
        <Route
          path="profile/*"
          element={<ProfileLayout auth={auth} user={user} />}
        />
        <Route
          path="admin/*"
          element={<ProtectedLayout auth={auth} user={user} />}
        />
      </Routes>
    </div>
  );
});
ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
