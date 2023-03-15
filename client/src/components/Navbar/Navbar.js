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
            main: "#ffd700",
            light: '#f05545',
            dark: '#7f0000'
        },
    },
});

const NavigationBar = (props) => {

    return (
        <div>
            <AppBar position="static" color="primary">
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
                        onClick={() => history.push('/Upcoming')}
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

                </Toolbar>
            </AppBar>
        </div>
    )
};

export default NavigationBar;