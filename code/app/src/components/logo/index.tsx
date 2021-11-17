import {Box} from "@material-ui/core";
import src from '../../assets/logo/logo-300x300.png';

export const Logo = () => {
    return (
        <Box style={{
            position: "sticky",
            top: 0
        }}>
            <a href="/">
                <img style={{}} alt="logo" src={src}/>
            </a>
        </Box>
    )
}

