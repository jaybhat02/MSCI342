import * as React from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Link from '@material-ui/core/Link';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';

import { textAlign } from '@mui/system';
import history from '../Navigation/history'
import logo from "./logo.png";
import { Box } from '@material-ui/core';

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

const NavigationBar = (props) => {
    const [profile, setProfile] = React.useState("");

    const signOut = async () => {
        localStorage.setItem("profile", [["null"]]);
        history.push("/");
    }

    React.useEffect(() => {
        if (props.profile) setProfile(props.profile.first_name);
    }, [props.profile])

    return (
        <div>
            <AppBar position="static" style={{ backgroundColor: "#000000", color: "rgb(251, 178, 0)" }}>
                <Toolbar>
                    <Box display='flex' flexGrow={1}>
                        <img src={logo} width="45" height="45" style={{ cursor: "pointer", marginTop: '10px' }} />
                        <Link
                            color="inherit"
                            style={{ cursor: "pointer", margin: '20px' }}
                            onClick={() => history.push('/Home')}
                        >
                            <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
                                Home
                            </Typography>
                        </Link>
                        <Link
                            color="inherit"
                            style={{ cursor: "pointer", margin: '20px' }}
                            onClick={() => history.push('/Upcoming')}
                        >
                            <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
                                Upcoming
                            </Typography>
                        </Link>
                        <Link
                            color="inherit"
                            style={{ cursor: "pointer", margin: '20px' }}
                            onClick={() => history.push('/Previous')}
                        >
                            <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
                                Previous
                            </Typography>
                        </Link>
                    </Box>

                    <Link
                        color="inherit"
                        style={{ cursor: "pointer", margin: '20px', right: 0 }}
                        onClick={signOut}
                    >
                        <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
                            Sign Out
                        </Typography>
                    </Link>
                    <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
                        Hi {profile}!
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
};

export default NavigationBar;