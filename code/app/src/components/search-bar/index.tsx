import SearchBar from "material-ui-search-bar";
import React, { useState } from "react";
import { Box, Slider } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const marks = [
  {
    value: 0,
    label: "0 km",
  },
  {
    value: 100,
    label: "100 km",
  },
];
export const Search = () => {
  let navigate = useNavigate();
  const [locationDisabled, setLocationStatus] = useState(true);
  const [distance, setDistance] = useState(0);
  const [searchValue, setValue] = useState("");
  let search = () => {
    navigate("/search", {
      state: { keyword: searchValue, distance: distance },
    });
    window.location.reload();
  };
  const valueText = (value: number) => {
    return `${value} km`;
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
    }
  };

  const showPosition = (position: any) => {
    console.log(position);
  };

  const handleGeolocation = () => {
    if (locationDisabled) {
      console.log("active");
      getLocation();
      return;
    }
    return;
  };

  function showError(error: any) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("Permission Denied");
        break;
    }
  }

  return (
    <React.Fragment>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          width: "100%",
        }}
      >
        <Typography component="h3" color="black" variant="h6">
          Find your interests
        </Typography>
        <SearchBar
          value={searchValue}
          onChange={(value: string) => setValue(value)}
          onRequestSearch={() => {
            search();
          }}
          style={{
            width: "100%",
          }}
        />
        <Box sx={{ width: 400, display: "flex" }}>
          <FormControlLabel
            sx={{ marginRight: "10px", minWidth: 100, color: "initial" }}
            value="start"
            control={
              <Checkbox
                value={!locationDisabled}
                checked={!locationDisabled}
                onClick={() => {
                  handleGeolocation();
                }}
                onChange={(e) => {
                  setLocationStatus(!locationDisabled);
                }}
              />
            }
            label="Use location"
            labelPlacement="start"
          />
          <Slider
            aria-label="Custom marks"
            defaultValue={distance}
            valueLabelDisplay="auto"
            step={10}
            getAriaValueText={valueText}
            marks={marks}
            onChange={(e, newValue) => {
              setDistance(newValue as number);
              console.log(newValue);
            }}
            min={0}
            disabled={locationDisabled}
            max={100}
          />
        </Box>
      </Box>
    </React.Fragment>
  );
};
