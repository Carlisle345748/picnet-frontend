import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Stack} from "@mui/material";
import {SignIn} from "./signIn";
import {useState} from "react";
import {SignUp} from "./signUp";
import backgroundImageUrl from "../../assets/background.png"


export default function LoginRegister() {
    const theme = createTheme();
    const [page, setPage] = useState('signIn');

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" justifyContent="center" alignItems="center" sx={{
                height: '100vh',
                backgroundImage: `url(${backgroundImageUrl})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
                <CssBaseline/>
                <Stack component={Paper}
                       justifyContent="center"
                       alignItems="center"
                       sx={{zIndex: 1, width: 400, borderRadius: 5}}>
                    {page === 'signIn' ? <SignIn setPage={setPage}/> : <SignUp setPage={setPage}/>}
                </Stack>
                <Box sx={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'rgba(0,0,0,0.3)',
                }}/>
            </Grid>
        </ThemeProvider>
    );
}