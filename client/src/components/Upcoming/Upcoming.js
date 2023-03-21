import * as React from 'react';
import history from '../Navigation/history';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Link from '@material-ui/core/Link';
import { createTheme, ThemeProvider, styled } from '@material-ui/core/styles';
import Navbar from '../Navbar/Navbar';
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";

//const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3049";
const serverURL = "";

const lightTheme = createTheme({
    palette: {
        type: 'light',
        background: {
            default: "#ffffff"
        },
        primary: {
            main: '#2196f3',

            dark: '#ba6b6c',
            background: '#e1f1fd'
        },
        secondary: {
            main: "rgb(251, 178, 0)",
            light: '#f05545',
            dark: '#7f0000'
        },
    },
    typography: {
        fontFamily: ["Open Sans, sans-serif"].join(",")
    }
});

const Upcoming = () => {
    const [loading, setLoading] = React.useState(true);

    return (
        <ThemeProvider theme={lightTheme}>
            <Navbar />
            <Container maxWidth style={{ overflow: 'scroll', backgroundColor: "rgb(253, 253, 253)", position: 'fixed', width: '100%', height: '100%' }}>
                <Grid container spacing={3} style={{ padding: '25px' }} >
                    <Grid item xs={12}>
                        <Box sx={{ textAlign: 'right', textAlign: 'center', padding:'10px'}}>
                            <Typography id='head'>
                                Upcoming Sessions
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={6}>
                        <Box sx={{ textAlign: 'right', textAlign: 'center', padding:'10px'}}>
                            <Typography variant='h4'>Created Sessions </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={6}>
                        <Box sx={{ textAlign: 'right', textAlign: 'center', padding:'10px'}}>
                            <Typography variant='h4'>Joined Sessions </Typography>
                        </Box>
                    </Grid>

                    {loading && (
                        <Box sx={{ textAlign: 'center', textAlign: 'center', }} width='100%'>
                            <CircularProgress color='secondary' />
                        </Box>
                    )}

                </Grid >
            </Container>
        </ThemeProvider >
    )
}


export default Upcoming;