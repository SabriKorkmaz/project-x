import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { createTheme, Snackbar } from "@material-ui/core";
import { ThemeProvider } from "@mui/material";
import Latest from "./components/latest";
import Header from "./components/header";
import { Search } from "./routes/search";
import { Recovery } from "./routes/recovery";
import HeaderWithoutSearch from "./components/header-without-search";
import { Profile } from "./routes/profile";
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

export const SnackbarContext = createContext({});
const ProfileLayout = (props: any) => {
  if (!MainStore.auth) {
    return (
      <Navigate
        to={{
          pathname: "/",
        }}
      />
    );
  }
  return (
    <HeaderWithoutSearch
      username={props.username}
      auth={props.email}
      admin={props.admin}
    >
      <Routes>
        <Route path="/" element={<Profile />} />
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
    <HeaderWithoutSearch
      username={props.username}
      auth={props.auth}
      admin={props.admin}
    >
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

    warning: {
      main: "#B33A3A",
    },
  },
});

const App = () => {
  const [snack, setSnack] = useState({
    message: "",
    type: "success" as AlertColor,
    open: false,
  });
  const handleClose = () => {
    setSnack({ message: "", type: "error" as AlertColor, open: false });
  };

  return (
    <SnackbarContext.Provider value={{ snack, setSnack }}>
      <Snackbar
        transitionDuration={200}
        autoHideDuration={1000}
        open={snack.open}
        onClose={handleClose}
        message={snack.message}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <MuiAlert severity={snack.type}>
          <h3>{snack.message}</h3>
        </MuiAlert>
      </Snackbar>
      <React.Fragment>
        <AllRoute />
      </React.Fragment>
    </SnackbarContext.Provider>
  );
};

const AllRoute = observer(() => {
  let [auth, setAuth] = useState(false);
  let [user, setUser] = useState({} as UserModel);
  useEffect(() => {
    auth = SessionStorageUtil.getItem("auth") === "true";
    let userString = SessionStorageUtil.getItem("user");
    setAuth(auth);
    if (userString) {
      user = JSON.parse(userString ?? "");
      setUser(user);
    }
    MainStore.setAuth(auth);
  }, []);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Header username={user.name} admin={user.admin} auth={auth}>
              <Latest />
            </Header>
          }
        />
        <Route
          path="/search/:keyword"
          element={
            <Header username={user.name} admin={user.admin} auth={auth}>
              <Search />
            </Header>
          }
        />
        <Route
          path="/recovery"
          element={
            <Header username={user.name} admin={user.admin} auth={auth}>
              <Recovery />
            </Header>
          }
        />
        <Route
          path="profile/*"
          element={
            <ProfileLayout
              auth={auth}
              username={user.name}
              admin={user.admin}
            />
          }
        />
        <Route
          path="admin/*"
          element={
            <ProtectedLayout
              auth={auth}
              username={user.name}
              admin={user.admin}
            />
          }
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
