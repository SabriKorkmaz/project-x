import React, { useContext, useState } from "react";
import BasicModal from "../modal";
import { ModalType } from "./modal-type.enum";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { CreateModalProps } from "./interface";
import { Container, Input } from "@material-ui/core";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { InputLabel } from "@mui/material";
import { MeetupService } from "../../services/meetup/meetup.service";
import { ServiceService } from "../../services/service/service.service";
import { ServiceModel } from "../../services/service/service.interface";
import { SnackbarContext } from "../../index";
import { MeetupModel } from "../../services/meetup/meetup.interface";
import { BaseService } from "../../services/base/base.service";

export default function CreateModal(props: CreateModalProps) {
  let ModalName = `Create ${
    props.type === ModalType.Service ? "Service" : "Meetup"
  }`;
  // @ts-ignore
  const { setSnack } = useContext(SnackbarContext);
  let Adapter = AdapterDateFns as any;
  const [input, setInput] = useState({
    name: "",
    title: "",
    attendeeLimit: 1,
    address: "",
    credit: 1,
    duration: "",
    description: "",
    userId: props.userId,
    id: 0,
  });
  const [date, setDate] = React.useState<Date | null>(new Date());
  const [imageUrl, setImgSource] = useState("");
  const [file, setFile] = useState(null as any);
  const onFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };
  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", file as any, file.name);
    let result = await MeetupService.upload(formData);
    if (result.isSuccess) {
      result.url = BaseService.baseUrl + result.url.slice(1);
      setImgSource(result.url);
    }
    setSnack({
      message: result.message,
      open: true,
      type: result.isSuccess ? "success" : "error",
    });
  };

  const save = async () => {
    let result = null;
    if (props.type === ModalType.Service) {
      let service: ServiceModel = { ...input, date, imageUrl };
      console.log(service);
      result = await ServiceService.save(service);
    } else if (props.type === ModalType.Meetup) {
      let meetup: MeetupModel = { ...input, date, imageUrl };
      console.log(meetup);

      result = await MeetupService.save(meetup);
    }
    if (result) {
      setSnack({
        message: result.message,
        open: true,
        type: result.isSuccess ? "success" : "error",
      });
    }
  };
  const creditInput = () => {
    if (props.type === ModalType.Service) {
      return (
        <TextField
          margin="normal"
          required
          fullWidth
          value={input.credit}
          onChange={(e) => {
            if (e.target.value) {
              e.persist();
              setInput((prevState) => ({
                ...prevState,
                credit: parseInt(e.target.value),
              }));
            }
          }}
          id="credit"
          variant="outlined"
          type="number"
          label="Credit"
          name="credit"
          autoComplete="credit"
          autoFocus
        />
      );
    }
    return;
  };

  return (
    <React.Fragment>
      <BasicModal buttonName={ModalName} width="80%">
        <h2>{ModalName}</h2>
        <Container style={{ display: "flex", flexDirection: "row" }}>
          <Box
            component="form"
            style={{ flexGrow: 20 }}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              value={input.name}
              onChange={(e) => {
                e.persist();

                setInput((prevState) => ({
                  ...prevState,
                  name: e.target.value,
                }));
              }}
              id="name"
              variant="outlined"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              value={input.title}
              onChange={(e) => {
                e.persist();

                setInput((prevState) => ({
                  ...prevState,
                  title: e.target.value,
                }));
              }}
              fullWidth
              variant="outlined"
              name="title"
              label="Title"
              id="title"
              autoComplete="title"
            />

            <TextField
              margin="normal"
              required
              value={input.address}
              onChange={(e) => {
                e.persist();

                setInput((prevState) => ({
                  ...prevState,
                  address: e.target.value,
                }));
              }}
              fullWidth
              variant="outlined"
              name="address"
              minRows={4}
              multiline={true}
              label="Address"
              id="address"
              autoComplete="address "
            />
            <TextField
              margin="normal"
              required
              value={input.description}
              onChange={(e) => {
                e.persist();

                setInput((prevState) => ({
                  ...prevState,
                  description: e.target.value,
                }));
              }}
              multiline={true}
              fullWidth
              minRows={8}
              id="description"
              variant="outlined"
              label="Description"
              name="description"
              autoComplete="description"
            />
          </Box>
          <Box
            style={{ flexGrow: 20 }}
            component="form"
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              required
              value={input.duration}
              onChange={(e) => {
                e.persist();

                setInput((prevState) => ({
                  ...prevState,
                  duration: e.target.value,
                }));
              }}
              fullWidth
              id="duration"
              variant="outlined"
              label="Duration"
              name="Duration"
              autoComplete="duration"
            />

            <TextField
              margin="normal"
              required
              fullWidth
              value={input.attendeeLimit}
              onChange={(e) => {
                e.persist();

                if (e.target.value) {
                  setInput((prevState) => ({
                    ...prevState,
                    attendeeLimit: parseInt(e.target.value),
                  }));
                }
              }}
              id="attendeeLimit"
              variant="outlined"
              type="number"
              label="Attendee limit"
              name="attendeeLimit"
              autoComplete="attendeeLimit"
              autoFocus
            />
            {creditInput()}
            <LocalizationProvider dateAdapter={Adapter}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="Date"
                value={date}
                inputFormat={"mm/dd/yy hh:mm:ss"}
                onChange={(newValue) => {
                  setDate(new Date(newValue as any));
                }}
              />
            </LocalizationProvider>

            <InputLabel htmlFor="import-button" style={{ border: "none" }}>
              <Input
                onChange={onFileChange}
                id="import-button"
                inputProps={{
                  accept: ".png,.jpeg,.jpg",
                }}
                type="file"
                name="file"
              />
              <Button
                onClick={uploadImage}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Upload
              </Button>
            </InputLabel>
            <img width={"300px"} src={imageUrl} />
          </Box>
        </Container>
        <Button
          fullWidth
          variant="contained"
          onClick={() => save()}
          sx={{ mt: 3, mb: 2 }}
        >
          Save
        </Button>
      </BasicModal>
    </React.Fragment>
  );
}
