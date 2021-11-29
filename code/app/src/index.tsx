import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { createTheme } from "@material-ui/core";
import { ThemeProvider } from "@mui/material";
import Latest from "./components/latest";
import Header from "./components/header";
import { Search } from "./routes/search";
import { Recovery } from "./routes/recovery";
import HeaderWithoutSearch from "./components/header-without-search";
import { Profile } from "./routes/profile";
import { Services } from "./routes/service";
import { Meetups } from "./routes/meetup";

const ProfileLayout = () => {
  return (
    <HeaderWithoutSearch>
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/services" element={<Services />} />
        <Route path="/meetups" element={<Meetups />} />
      </Routes>
    </HeaderWithoutSearch>
  );
};
const ProtectedLayout = () => {
  return (
    <HeaderWithoutSearch>
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
    text: {
      secondary: "#000000",
      primary: "#000000",
    },
  },
});
const App = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Header>
              <Latest />
            </Header>
          }
        />
        <Route
          path="/search/:keyword"
          element={
            <Header>
              <Search />
            </Header>
          }
        />
        <Route
          path="/recovery"
          element={
            <Header>
              <Recovery />
            </Header>
          }
        />
        <Route path="profile/*" element={<ProfileLayout />} />
        <Route path="admin/*" element={<ProtectedLayout />} />
      </Routes>
    </div>
  );
};
ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
