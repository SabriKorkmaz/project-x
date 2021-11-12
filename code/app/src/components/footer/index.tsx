import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Box, Chip} from "@material-ui/core";
import {Stack, Toolbar} from '@mui/material';


export default function Footer() {
    const handleClick = () => {
        console.info('You clicked the Chip.');
    };
    return (
        <Box color="primary" style={{bottom: 0, position: "fixed",width:"500px"}}>
            <Container maxWidth="lg" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <Box>
                    <Toolbar>
                        <Typography variant="body1" color="inherit">
                            © SWE 573
                        </Typography>
                    </Toolbar>
                </Box>
                <Box>
                    <Stack direction="row" spacing={2}>
                        <Chip size="medium" label="How it works?" variant="outlined" onClick={handleClick} />
                        <Chip size="medium" label="GDPR" variant="outlined" onClick={handleClick} />
                        <Chip size="medium" label="Cookie Policy" variant="outlined" onClick={handleClick} />
                    </Stack>

                </Box>
            </Container>
        </Box>
    );
}
