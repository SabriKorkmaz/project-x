import SearchBar from "material-ui-search-bar";
import React, { useState } from "react";
import { Box } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export const Search = () => {
  let navigate = useNavigate();
  const [searchValue, setValue] = useState("");
  let search = () => {
    navigate("/search", { state: { keyword: searchValue } });
  };

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
      </Box>
    </React.Fragment>
  );
};
