import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableRow,
} from "@material-ui/core";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import Button from "@mui/material/Button";

const AttendeeList = (props: any) => {
  const actionButtons = (row: any) => {
    if (!row.status) {
      return (
        <React.Fragment>
          <TableCell align="right">
            <Button
              onClick={() => {
                props.acceptAction(row.id);
              }}
              size="small"
              variant="outlined"
              color={"success"}
            >
              Accept
            </Button>
          </TableCell>
          <TableCell align="right">
            <Button
              onClick={() => {
                props.declineAction(row.id);
              }}
              size="small"
              variant="outlined"
              color={"error"}
            >
              Decline
            </Button>
          </TableCell>
        </React.Fragment>
      );
    }
    return;
  };
  const table = (data: any) => {
    if (data.length) {
      return (
        <Table style={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>UserId</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Surname</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">-</TableCell>
              <TableCell align="right">-</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: any) => (
              <TableRow>
                <TableCell component="th" scope="row">
                  {row.userId}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.surname}</TableCell>
                <TableCell align="right">
                  {row.status === true ? "Accepted" : "Waiting"}
                </TableCell>
                {actionButtons(row)}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    }
    return <h6>Attendee list is empty</h6>;
  };

  return (
    <React.Fragment>
      <TableContainer
        component={Paper}
        style={{ marginTop: 50, padding: 20, marginBottom: 50 }}
      >
        <h4>Attendee List</h4>
        {table(props.data)}
      </TableContainer>
    </React.Fragment>
  );
};

export default AttendeeList;
