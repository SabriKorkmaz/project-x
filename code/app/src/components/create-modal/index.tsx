import React, { useContext, useEffect, useState } from "react";
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
import { SnackbarContext } from "../../index";
import { BaseService } from "../../services/base/base.service";
import { ProcessType } from "../../utils/process-type.enum";
import MainStore from "../../stores/index";
import { GoogleMaps } from "../google-maps";

import GooglePlacesAutocomplete from "react-google-places-autocomplete";

export default function CreateModal(props: CreateModalProps) {
  let ModalNameUpdate = props.mode == ProcessType.Create ? "Create" : "Edit";
  let ModalName = `${ModalNameUpdate} ${
    props.type === ModalType.Service ? "Service" : "Meetup"
  }`;
  const [value, setValue] = useState(null as any);
  // @ts-ignore
  const { setSnack } = useContext(SnackbarContext);
  useEffect(() => {
    if (props.mode === ProcessType.Update) {
      props.data.address = JSON.parse(props.data.address);
      setInput(props.data);
      setDate(props.data.date);
      setImgSource(props.data.imageUrl);
      setValue(props.data.address);
    }
  }, [props.data]);
  let Adapter = AdapterDateFns as any;
  const [input, setInput] = useState({
    title: "",
    capacity: 1,
    hours: 1,
    description: "",
    longitude: 29.1041687,
    latitude: 41.0246477,
    userId: props.userId,
    id: 0,
  });
  const [dateValue, setDate] = React.useState<any>(Date());
  const [imageUrl, setImgSource] = useState("");
  const [file, setFile] = useState(null as any);
  const geocoder = new google.maps.Geocoder();
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

  const setCoordinate = async (value: any) => {
    setValue(value);
    let result = await geocoder.geocode({
      placeId: value.value.place_id,
    });
    setInput((prevState) => ({
      ...prevState,
      latitude: parseFloat(result.results[0].geometry.location.lat() as any),
      longitude: parseFloat(result.results[0].geometry.location.lng() as any),
    }));
  };
  const setAutoComplete = async (lng: any, lat: any) => {
    let value = await geocoder.geocode({
      location: {
        lat: parseInt(lat),
        lng: lng,
      },
    });
    setValue({
      value: value.results[0],
      label: value.results[0].formatted_address,
    });
  };
  const save = async () => {
    let address = JSON.stringify(value);
    let isValid = true;
    let date = new Date(new Date(dateValue).setSeconds(0)).toLocaleString();
    let result = { ...input, date, imageUrl, address };
    Object.keys(result).forEach((key) => {
      if (key !== "id" && (result[key] === "" || result[key] === 0)) {
        isValid = false;
      }
    });

    if (!isValid) {
      setSnack({
        message: "Form alanları boş geçilemez",
        open: true,
        type: "error",
      });
      return;
    }

    let response = null;
    if (props.type === ModalType.Service) {
      response = await ServiceService.save(result as any);
    } else if (props.type === ModalType.Meetup) {
      response = await MeetupService.save(result as any);
    }
    await MainStore.updateUser();
    if (result) {
      setSnack({
        message: response.message,
        open: true,
        type: response.isSuccess ? "success" : "error",
      });
      setInterval(() => {
        window.location.reload();
      }, 500);
    }
  };

  const creditInput = () => {
    if (props.type === ModalType.Service) {
      return (
        <TextField
          margin="normal"
          required
          fullWidth
          value={input.hours}
          onChange={(e) => {
            if (e.target.value) {
              e.persist();
              setInput((prevState) => ({
                ...prevState,
                hours: parseInt(e.target.value),
              }));
            }
          }}
          id="credit"
          variant="outlined"
          type="number"
          label="Hours"
          name="hours"
          autoComplete="hours"
          autoFocus
        />
      );
    }
    return;
  };

  return (
    <React.Fragment>
      <BasicModal buttonName={props.buttonName} width="80%">
        <h2>{ModalName}</h2>
        <Container style={{ display: "flex", flexDirection: "row" }}>
          <Box
            component="form"
            style={{ flexGrow: 20, marginRight: 40 }}
            noValidate
            sx={{ mt: 1 }}
          >
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
            <GooglePlacesAutocomplete
              selectProps={{
                value,
                onChange: setCoordinate,
              }}
            />
            {/*  <TextField
              margin="normal"
              required
              value={input.address}

              fullWidth
              variant="outlined"
              name="address"
              multiline={true}
              label="Address"
              id="address"
              autoComplete="address "
            />*/}
            <div style={{ height: "400px", width: "300px" }}>
              <GoogleMaps
                center={value}
                handleChange={(lng: any, lat: any) => {
                  setInput((prevState) => ({
                    ...prevState,
                    longitude: lng.toFixed(4),
                    latitude: lat.toFixed(4),
                  }));
                  setAutoComplete(lng, lat);
                }}
              />
            </div>
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
              margin="normal"
              required
              fullWidth
              value={input.capacity}
              onChange={(e) => {
                e.persist();

                if (e.target.value) {
                  setInput((prevState) => ({
                    ...prevState,
                    capacity: parseInt(e.target.value),
                  }));
                }
              }}
              id="capacity"
              variant="outlined"
              type="number"
              label="Capacity"
              name="capacity"
              autoComplete="capacity"
              autoFocus
            />
            {creditInput()}
            <LocalizationProvider dateAdapter={Adapter}>
              <DateTimePicker
                minutesStep={10}
                renderInput={(props) => <TextField {...props} />}
                label="Date"
                value={dateValue}
                onChange={(newValue) => {
                  setDate(newValue as any);
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
