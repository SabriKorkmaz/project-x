import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LoginIcon from '@mui/icons-material/Login';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import BasicModal from "../modal";
import Register from "../register";
import {Card} from "@material-ui/core";


export default function Auth() {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
        <Card component="main" style={{maxWidth:"250px",maxHeight:"535px" ,
            display:"flex",justifyContent:"center",alignItems:"center"}}>
        <Container component="main" maxWidth="xs" >
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: "sticky",
                    top: 0
                }}
            >
                <Avatar sx={{m: 1,}}>
                    <LoginIcon/>
                </Avatar>
                <Typography component="h1" color="black" variant="h5">
                    Sign in
                </Typography>


                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label="Remember me"
                        sx={{color: "black"}}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="/recovery" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                    </Grid>
                    <br/>
                    <BasicModal buttonName={"Register"}>
                        <Register/>
                    </BasicModal>
                </Box>
            </Box>
        </Container>
        </Card>
    );
}
