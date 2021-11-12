import {Box} from "@material-ui/core";
import src from '../../assets/logo/logo-300x300.png';
export const Logo = ()=>{
    return (
        <Box sx={{display:'flex'}}>
            <a href="/">
                <img alt="logo"  src={src}/>
            </a>
        </Box>
)
}

