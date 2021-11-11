import React from "react";
import {observer} from "mobx-react";
import {IHomeState} from "./interface";
import {Button, Stack} from "@mui/material";

@observer
export class Home extends React.Component<{}, IHomeState> {
    constructor(props: any) {
        super(props);
    }

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
