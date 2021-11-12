import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import {Home} from "./routes/home";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import {createTheme} from "@material-ui/core";
import {ThemeProvider} from "@mui/material";

const App = () => {
    return (<Routes>
        <Route index element={<Home/>}/>
    </Routes>)
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

