import React, { useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import ExploreIcon from "@mui/icons-material/Explore";
import Button from "@material-ui/core/Button";

const containerStyle = {
  width: "600px",
  height: "300px",
};

export const GoogleMaps = (props: any) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "key-here",
  });
  const [position, setPosition] = useState({
    lat: 41.0246477,
    lng: 29.1041687,
  });
  const [center, setCenter] = useState({
    lat: 41.0246477,
    lng: 29.1041687,
  });

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
    }
    console.log(position);
  };

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

  function showError(error: any) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("Permission Denied");
        break;
    }
  }

  return isLoaded ? (
    <React.Fragment>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        clickableIcons={true}
        zoom={10}
        heading={1}
        onClick={(e) => {
          setPosition({
            lat: e.latLng?.lat()!,
            lng: e.latLng?.lng()!,
          });
          props.handleChange(e.latLng?.lng(), e.latLng?.lat());
        }}
      >
        <Marker
          position={{
            lat: position.lat,
            lng: position.lng,
          }}
        />
        <Button style={{ top: "240px" }}>
          <ExploreIcon
            fontSize="large"
            onClick={() => {
              getLocation();
            }}
            aria-label="Find current location"
          />
        </Button>
      </GoogleMap>
    </React.Fragment>
  ) : (
    <></>
  );
};

export default React.memo(GoogleMaps);
