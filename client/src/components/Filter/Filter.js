import * as React from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import "./Filter.css";

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

const Filter = (props) => {
    const sportsList = ['Soccer', 'Basketball', 'Volleyball'];
    const locationList = ['PAC', 'CIF'];
    const levelList = ['Beginner', 'Intermediate', 'Competitive'];
    const [sport, setSport] = React.useState("");
    const [location, setLocation] = React.useState("");
    const [level, setLevel] = React.useState("");
    const [date, setDate] = React.useState();

    React.useEffect(() => {
        var newFilter = {};
        if (sport) newFilter['sport'] = sport;
        if (level) newFilter['level'] = level;
        if (location) newFilter['location'] = location;
        if (date) newFilter['date_and_time'] = date;
        props.setFilters(newFilter);
    }, [sport, location, level, date]);

    React.useEffect(() => {
        setSport("");
        setLevel("");
        setLocation("");
        setDate("");
        props.setReset(false);
    }, [props.reset]);

    const handleSportChange = (event) => {
        setSport(event.target.value);
    };

    const handelLevelChange = (event) => {
        setLevel(event.target.value);
    };

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };


    return (
        <ThemeProvider theme={lightTheme} >
            <Box sx={{ marginRight: '10px' }} display='inline'>
                <FormControl variant='outlined' >
                    <TextField variant='outlined' id="date" type="date" onChange={handleDateChange} value={date} style={{ backgroundColor: "rgb(251, 178, 0)", color: "#000000", width: '150px', borderRadius: '3px' }} />
                </FormControl>
            </Box>
            <Box sx={{ marginRight: '10px', height: '10px' }} display='inline'>
                <FormControl variant='outlined' >
                    <Select native value={sport} onChange={handleSportChange} id="sport" autoWidth style={{ backgroundColor: "rgb(251, 178, 0)", color: "#000000", height: '42px' }} >
                        <option value=""></option>
                        {sportsList.map((sport) => (
                            <option key={sport} value={sport}>{sport}</option>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ marginRight: '10px' }} display='inline'>
                <FormControl variant='outlined' >
                    <Select native value={location} onChange={handleLocationChange} label="Select Location" id={"location"} autoWidth style={{ backgroundColor: "rgb(251, 178, 0)", color: "#000000", height: '42px' }}>
                        <option value=""></option>
                        {locationList.map((location) => (
                            <option key={location} value={location}>{location}</option>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ marginRight: '10px' }} display='inline'>
                <FormControl variant='outlined' >
                    <Select native value={level} onChange={handelLevelChange} label="Select Level" id={"level"} autoWidth style={{ backgroundColor: "rgb(251, 178, 0)", color: "#000000", height: '42px' }}>
                        <option value=""></option>
                        {levelList.map((level) => (
                            <option key={level} value={level}>{level}</option>
                        ))}
                    </Select>
                </FormControl>
            </Box>

        </ThemeProvider >
    )
};

export default Filter;