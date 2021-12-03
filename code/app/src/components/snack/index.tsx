import { Snackbar } from "@material-ui/core";
import { useState } from "react";
import { createContext } from "react";
import { Alert } from "@mui/material";

export const SnackbarContext = createContext({} as any);

export default function SnackBarProvider() {
  const [snack, setSnack] = useState({
    message: "",
    color: "",
    open: false,
  });
  return (
    <SnackbarContext.Provider value={{ snack, setSnack }}>
      <Snackbar open={snack.open}>
        <Alert>{snack.message}</Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}
