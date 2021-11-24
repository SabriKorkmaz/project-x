import ListItem from '@mui/material/ListItem';
import {Box, Button, Card, Link} from "@material-ui/core";
import CssBaseline from "@mui/material/CssBaseline";
import Avatar from "@mui/material/Avatar";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import {useNavigate} from "react-router-dom";

export default function SideBar() {
    let navigate = useNavigate();
    return (
        <Card component="main" style={{
            minWidth: "250px", maxHeight: "535px",
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: "sticky",
            top: 0
        }}>
            <Box style={{display: "flex", height: "100%", flexDirection: "column"}}>
                <CssBaseline/>
                <ListItem style={{display: "flex", justifyContent: "center"}} alignItems="center">

                    <Avatar sx={{m: 1}} style={{display: "flex", justifyContent: "center"}}>
                        <AccountCircleOutlinedIcon fontSize="large"/>
                    </Avatar>
                </ListItem>

                <ListItem style={{display: "flex", justifyContent: "center"}} alignItems="center">

                    <Link
                        component="button"
                        variant="h4"
                        onClick={() => {
                            navigate("/profile", {replace: true,});
                        }}
                    >
                        My Profile
                    </Link>
                </ListItem>
                <ListItem style={{display: "flex", justifyContent: "center"}} alignItems="center">

                    <Link
                        component="button"
                        variant="h4"
                        onClick={() => {
                            navigate("/profile/events", {replace: true,});
                        }}
                    >
                        My Events
                    </Link>
                </ListItem>
                <ListItem style={{display: "flex", justifyContent: "center"}} alignItems="center">
                    <Link
                        component="button"
                        variant="h4"
                        onClick={() => {
                            navigate("/profile/services", {replace: true,});
                        }}
                    >
                        My Services
                    </Link>
                </ListItem>
                <ListItem style={{display: "flex", justifyContent: "center"}} alignItems="center">

                    <Link
                        component="button"
                        variant="h4"
                        onClick={() => {
                            console.info("I'm a button.");
                        }}
                    >
                        Create Event
                    </Link>
                </ListItem>
                <ListItem style={{display: "flex", justifyContent: "center"}} alignItems="center">

                    <Link
                        component="button"
                        variant="h4"
                        onClick={() => {
                            console.info("I'm a button.");
                        }}
                    >
                        Create Service
                    </Link>
                </ListItem>
                <ListItem style={{display: "flex", justifyContent: "center"}} sx={{borderTop: 1}} alignItems="center">

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
                <ListItem style={{display: "flex", justifyContent: "center"}} alignItems="center">

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
                <ListItem style={{display: "flex", justifyContent: "center"}} alignItems="center">

                    <Link
                        component="button"
                        variant="h4"
                        onClick={() => {
                            console.info("I'm a button.");
                        }}
                    >
                        Events
                    </Link>
                </ListItem>

                <ListItem style={{display: "flex", justifyContent: "center"}} alignItems="center">

                    <Button
                        component="button"
                        variant="outlined"
                        onClick={() => {
                            console.info("I'm a button.");
                        }}
                    >
                       Logout
                    </Button>
                </ListItem>


            </Box>
        </Card>
    );
}
