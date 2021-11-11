import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import {Home} from "./routes/home";
import Detail from "./routes/detail";
import {BrowserRouter} from "react-router-dom";
import {RouteComponentProps} from '@reach/router';

const App = () => {

    const RouterPage = (
        props: { pageComponent: JSX.Element } & RouteComponentProps
    ) => props.pageComponent


    return (
        <div style={{height: "100%", width: "100%"}}>
            <RouterPage path="/" pageComponent={<Home/>}/>
            <RouterPage path="/Detail" pageComponent={<Detail/>}/>
        </div>
    );
};
ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    document.getElementById("root")
);


serviceWorker.unregister();

