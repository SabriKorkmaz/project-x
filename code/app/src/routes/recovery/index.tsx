//import {observer} from "mobx-react";
import { Box, Container } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState } from "react";

//@observer
export const Recovery = (props: any) => {
  let [email, setEmail] = useState("");
  let handleClick = () => {};

  //const { setSnack } = useContext(SnackbarContext);
  return (
    <Container maxWidth="xl" style={{ paddingTop: "100px" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography component="h3" color="black" variant="h6">
          Recovery your password
        </Typography>
        <Box
          sx={{
            color: "red",
            display: "flex",
            flexDirection: "row",
            flex: "50%",
          }}
          style={{ justifyContent: "center" }}
        >
          <TextField
            margin="normal"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
        </Box>
      </Box>
      <Button onClick={handleClick} variant="contained">
        Recovery
      </Button>
    </Container>
  );
};
