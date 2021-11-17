import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import {createTheme} from "@material-ui/core";
import {ThemeProvider} from "@mui/material";
import Latest from "./components/latest";
import Header from "./components/header";
import {Search} from "./routes/search";
import {Recovery} from "./routes/recovery";

const App = () => {
    return (

        <Header>
            <Routes>
                <Route path="/" element={
                    <Latest/>
                }/>

                <Route path="/search/:keyword" element={
                    <Search/>
                }/>

                <Route path="/recovery" element={
                    <Recovery/>
                }/>
            </Routes>
        </Header>

    )
};

const theme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#3f51b5',
        },
        secondary: {
            main: '#f50057',
        },
        background: {
            default: '#e0e0e0',
            paper: '#ffffff',
        },
    },
});
ReactDOM.render(
    <BrowserRouter>
        <ThemeProvider theme={theme}>
            <App/>
        </ThemeProvider>
    </BrowserRouter>,
    document.getElementById("root")
);


serviceWorker.unregister();

