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
import { AttendeStatusEnum } from "../../services/service/service.interface";
import { useNavigate } from "react-router-dom";

const AttendeeList = (props: any) => {
  let navigate = useNavigate();
  const actionButtons = (row: any) => {
    return (
      <React.Fragment>
        <TableCell align="right">
          <Button
            onClick={() => {
              props.updateAction(
                row.id,
                AttendeStatusEnum.Approved,
                row.handshakeStatus
              );
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
              props.updateAction(
                row.id,
                AttendeStatusEnum.Rejected,
                row.handshakeStatus
              );
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
  };
  const status = (row: any) => {
    if (row.status === AttendeStatusEnum.Rejected) return "Rejected";
    if (row.status === AttendeStatusEnum.Approved) return "Approved";
    if (row.status === AttendeStatusEnum.Waiting) return "Waiting";
    return;
  };
  const table = (data: any) => {
    if (data.length) {
      return (
        <Table style={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Profile</TableCell>
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
                  <Button
                    component="button"
                    variant="outlined"
                    onClick={() => {
                      navigate("/profile/detail", {
                        state: { id: row.userId },
                      });
                    }}
                  >
                    Profile
                  </Button>
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.surname}</TableCell>
                <TableCell align="right">{status(row)}</TableCell>
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
