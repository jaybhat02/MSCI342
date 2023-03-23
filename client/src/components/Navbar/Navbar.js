import * as React from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Link from '@material-ui/core/Link';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { textAlign } from '@mui/system';
import history from '../Navigation/history'

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
    const signOut= async ()=>{
        localStorage.setItem("profile",[["null"]]);
        history.push("/");
    }
    return (
        <div>
            <AppBar position="static" style={{ backgroundColor: "#000000", color: "rgb(251, 178, 0)" }}>
                <Toolbar>
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
                        
                    >
                        <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
                            Upcoming
                        </Typography>
                    </Link>
                    <Link
                        color="inherit"
                        style={{ cursor: "pointer", margin: '15px' }}
                        onClick={() => history.push('/Previous')}
                    >
                        <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
                            Previous
                        </Typography>
                    </Link>
                    <Link
                        color="inherit"
                        style={{ cursor: "pointer", margin: '20px' , right:0}}
                        onClick={signOut}
                        >
                        <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
                            Sign Out
                        </Typography>
                    </Link>

                </Toolbar>
            </AppBar>
        </div>
    )
};

export default NavigationBar;