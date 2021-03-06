import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LoginIcon from "@mui/icons-material/Login";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import BasicModal from "../modal";
import Register from "../register";
import { Card } from "@material-ui/core";
import { useContext, useState } from "react";
import { UserService } from "../../services/user/user.service";
import { SnackbarContext } from "../../index";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // @ts-ignore
  const { setSnack } = useContext(SnackbarContext);

  const handleEmailInputChange = (event: any) => setEmail(event.target.value);
  const handlePassInputChange = (event: any) => setPassword(event.target.value);
  const handleSubmit = async () => {
    let result = await UserService.login({
      email: email,
      password: password,
    });

    if (result) {
      setSnack({
        message: result.message,
        open: true,
        type: result.isSuccess ? "success" : "error",
      });
    }
    if (result.isSuccess) {
      setInterval(() => {
        window.location.reload();
      }, 1100);
    }
  };

  return (
    <Card
      component="main"
      style={{
        maxWidth: "250px",
        height: "535px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "sticky",
            top: 0,
          }}
        >
          <Avatar sx={{ m: 1 }}>
            <LoginIcon />
          </Avatar>
          <Typography component="h1" color="black" variant="h5">
            Sign in
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              value={email}
              onChange={handleEmailInputChange}
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
              value={password}
              onChange={handlePassInputChange}
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              fullWidth
              onClick={handleSubmit}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <br />
            <BasicModal buttonName={"Register"}>
              <Register />
            </BasicModal>
          </Box>
        </Box>
      </Container>
    </Card>
  );
}
