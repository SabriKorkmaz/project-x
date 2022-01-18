import * as React from "react";
import Modal from "@mui/material/Modal";

import { Fab, TextField, Typography } from "@material-ui/core";
import ReviewsIcon from "@mui/icons-material/Reviews";
import { IModal } from "../modal/interface";
import { Rating } from "@mui/material";
import Button from "@mui/material/Button";
import { MeetupService } from "../../services/meetup/meetup.service";
import { useContext } from "react";
import { SnackbarContext } from "../../index";
import Box from "@mui/material/Box";
import { ModalType } from "../create-modal/modal-type.enum";
import { ServiceService } from "../../services/service/service.service";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: "24",
  p: 4,
  display: "flex",
  flexDirection: "column",
} as any;

export default function CommentModal(props: IModal) {
  const [open, setOpen] = React.useState(false);
  const [comment, setComment] = React.useState({
    rate: 1,
    comment: "",
  });
  // @ts-ignore
  const { setSnack } = useContext(SnackbarContext);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  style.width = props.width ?? "50%";
  const handleSave = async () => {
    let result = {} as any;
    if (props.type === ModalType.Meetup) {
      result = await MeetupService.createComment({
        meetupId: props.data.id,
        rate: comment.rate,
        comment: comment.comment,
      });
    }
    if (props.type === ModalType.Service) {
      result = await ServiceService.createComment({
        serviceId: props.data.id,
        rate: comment.rate,
        comment: comment.comment,
      });
    }

    if (result) {
      setSnack({
        message: result.message,
        open: true,
        type: result.isSuccess ? "success" : "error",
      });
      handleClose();
    }
  };
  return (
    <div>
      <Fab
        onClick={async () => {
          handleOpen();
        }}
        style={{
          width: "200px",
          marginTop: 20,
          fontSize: "medium",
        }}
        variant="extended"
      >
        <ReviewsIcon sx={{ mr: 1 }} />
        {props.buttonName}
      </Fab>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography style={{ fontSize: "20px" }} component="legend">
            Rate
          </Typography>
          <Rating
            style={{ fontSize: "40px", marginBottom: 40 }}
            name="simple-controlled"
            value={comment.rate}
            onChange={(event, newValue) => {
              setComment((prevState) => ({
                ...prevState,
                rate: Number(newValue),
              }));
            }}
          />
          <TextField
            inputProps={{ style: { fontSize: 20, lineHeight: 2 } }} // font size of input text
            InputLabelProps={{ style: { fontSize: 20, lineHeight: 2 } }}
            id="outlined-multiline-flexible"
            label="Comment"
            value={comment.comment}
            onChange={(e) => {
              e.persist();
              setComment((prevState) => ({
                ...prevState,
                comment: e.target.value,
              }));
            }}
            multiline
            maxRows={4}
          />
          <Button
            onClick={() => {
              handleSave();
            }}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Save
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
