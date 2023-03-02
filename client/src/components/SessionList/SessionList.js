import * as React from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';


const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3049";

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
            main: "#b71c1c",
            light: '#f05545',
            dark: '#7f0000'
        },
    },
});

const SessionList = () => {
    
    return (
        <ThemeProvider theme={lightTheme}>
            <p>Session List</p>
    
        </ThemeProvider>
    )
}

export default SessionList;