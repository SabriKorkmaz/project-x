import SearchBar from "material-ui-search-bar";
import React, { useState } from "react";
import { Box, Slider } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

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
  const [distance, setDistance] = useState(50);
  const [searchValue, setSearchValue] = useState("");

  let search = () => {
    navigate("/search", {
      state: { keyword: searchValue, distance: distance, location: value },
    });
    window.location.reload();
  };
  const [value, setValue] = useState(null);
  const valueText = (value: number) => {
    return `${value} km`;
  };

  /*  const getLocation = () => {
                  if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(showPosition, showError);
                  } else {
                  }
                };
  
                const showPosition = (position: any) => {
                  console.log(position);
                };
  
                const handleGeolocation = () => {
                  getLocation();
                  return;
                };
  
                function showError(error: any) {
                  switch (error.code) {
                    case error.PERMISSION_DENIED:
                      alert("Permission Denied");
                      break;
                  }
                }*/

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
          onChange={(value: string) => setSearchValue(value)}
          onRequestSearch={() => {
            search();
          }}
          style={{
            width: "100%",
          }}
        />
        <Box sx={{ width: 900, display: "flex", marginTop: 10 }}>
          <div style={{ marginRight: "30px", minWidth: 300, color: "initial" }}>
            <GooglePlacesAutocomplete
              selectProps={{
                value,
                onChange: setValue,
                placeholder: "Select Location",
              }}
            />
          </div>

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
            max={100}
          />
        </Box>
      </Box>
    </React.Fragment>
  );
};
