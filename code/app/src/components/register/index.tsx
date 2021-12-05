import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import { useContext, useState } from "react";
import { UserService } from "../../services/user/user.service";
import { SnackbarContext } from "../../index";

export default function Register() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  // @ts-ignore
  const { setSnack } = useContext(SnackbarContext);
  const handleSubmit = async () => {
    let result = await UserService.create({
      name: name,
      surname: surname,
      email: email,
      password: password,
    });

    setSnack({
      message: result.message,
      open: true,
      type: result.isSuccess ? "success" : "error",
    });

    setInterval(() => {
      window.location.reload();
    }, 1333);
  };

  return (
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
          <LockOutlinedIcon />
        </Avatar>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            variant="outlined"
            label="Name"
            autoComplete="name"
            autoFocus
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            variant="outlined"
            label="Surname"
            name="surname"
            autoComplete="surname"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            variant="outlined"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            name="passwordConfirm"
            label="Password Confirm"
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
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
