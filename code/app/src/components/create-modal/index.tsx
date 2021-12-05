import React, { useState } from "react";
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

export default function CreateModal(props: CreateModalProps) {
  let ModalName = `Create ${
    props.type === ModalType.Service ? "Service" : "Meetup"
  }`;
  let Adapter = AdapterDateFns as any;
  const [date, setDate] = React.useState<Date | null>(new Date());
  const [imgSource, setImgSource] = useState("");
  const [file, setFile] = useState(null as any);
  const onFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };
  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", file as any, file.name);
    let result = await MeetupService.upload(formData);
    console.log(result);
    setImgSource(result.url);

    console.log(result);
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
            <LocalizationProvider dateAdapter={Adapter}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="Date"
                value={date}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
              />
            </LocalizationProvider>
            <TextField
              margin="normal"
              required
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
              id="attendeeLimit"
              variant="outlined"
              type="number"
              label="Attendee limit"
              name="attendeeLimit"
              autoComplete="attendeeLimit"
              autoFocus
            />

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
            <img width={"300px"} src={imgSource} />
          </Box>
        </Container>
        <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Save
        </Button>
      </BasicModal>
    </React.Fragment>
  );
}
