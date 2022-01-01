import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import { IDogTag } from "./interface";
import { ModalType } from "../create-modal/modal-type.enum";
import { GoogleMap, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "460px",
  height: "300px",
};

const DogTag = (props: IDogTag) => {
  const [position, setPosition] = useState({
    lat: 41.0246477,
    lng: 29.1041687,
  });
  const [center, setCenter] = useState({
    lat: 41.0246477,
    lng: 29.1041687,
  });
  const geocoder = new google.maps.Geocoder();
  useEffect(() => {
    if (props.data != null) {
      props.data.address = JSON.parse(props.data.address);
      let fetchData = async () => {
        let result = await geocoder.geocode({
          placeId: props.data.address.value.place_id,
        });
        if (result.results.length > 0) {
          showPosition({
            coords: {
              latitude: result.results[0].geometry.location.lat(),
              longitude: result.results[0].geometry.location.lng(),
            },
          });
        }
      };
      fetchData();
    }
  }, [props.data]);

  function showPosition(position: any) {
    setCenter({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
    setPosition({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  }

  let credit = () => {
    if (props.type === ModalType.Service) {
      return (
        <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
          Credit
        </Typography>
      );
    } else return "";
  };
  let creditValue = () => {
    console.log(props);
    if (props.type === ModalType.Service) {
      return (
        <Typography sx={{ fontSize: 12 }} gutterBottom>
          {props.data.credit}
        </Typography>
      );
    } else return "";
  };
  return (
    <React.Fragment>
      <Card style={{ padding: 20 }}>
        <h4>Details</h4>
        <Card style={{ minWidth: 275, display: "flex" }}>
          <CardContent>
            {credit()}

            <Typography
              sx={{ fontSize: 12 }}
              color="text.secondary"
              gutterBottom
            >
              Date
            </Typography>
            <Typography
              sx={{ fontSize: 12 }}
              color="text.secondary"
              gutterBottom
            >
              Capacity
            </Typography>
            <Typography
              sx={{ fontSize: 12 }}
              color="text.secondary"
              gutterBottom
            >
              Address
            </Typography>
          </CardContent>
          <CardContent>
            {creditValue()}
            <Typography sx={{ fontSize: 12 }} gutterBottom>
              {props.data.duration}
            </Typography>
            <Typography sx={{ fontSize: 12 }} gutterBottom>
              {props.data.date}
            </Typography>
            <Typography sx={{ fontSize: 12 }} gutterBottom>
              {props.data.capacity}
            </Typography>
            <Typography sx={{ fontSize: 12 }} gutterBottom>
              {props.data?.address?.label}
            </Typography>
          </CardContent>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            clickableIcons={true}
            zoom={10}
            heading={1}
          >
            <Marker
              position={{
                lat: position.lat,
                lng: position.lng,
              }}
            />
          </GoogleMap>
        </Card>
      </Card>
    </React.Fragment>
  );
};

export default DogTag;
