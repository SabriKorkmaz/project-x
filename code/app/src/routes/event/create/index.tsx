import React from "react";

import {observer} from "mobx-react";
import {Button, Stack} from "@mui/material";

@observer
class Search extends React.Component {
    render() {
        return (
            <Stack spacing={2} direction="row">
                <Button variant="text">Text</Button>
                <Button variant="contained">Contained</Button>
                <Button variant="outlined">Outlined</Button>
            </Stack>
        );
    }
}

export default Search
