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
        <ThemeProvider theme={lightTheme}>
            <Box sx={{ marginRight: '10px' }} display='inline'>
                <TextField id="date" type="date" onChange={handleDateChange} value={date} />
            </Box>
            <Box sx={{ marginRight: '10px' }} display='inline'>
                <Select native value={sport} onChange={handleSportChange} label="Select Sport" id="sport" autoWidth >
                    <option value=""></option>
                    {sportsList.map((sport) => (
                        <option key={sport} value={sport}>{sport}</option>
                    ))}
                </Select>
            </Box>
            <Box sx={{ marginRight: '10px' }} display='inline'>
                <Select native value={location} onChange={handleLocationChange} label="Select Location" id={"location"} autoWidth>
                    <option value=""></option>
                    {locationList.map((location) => (
                        <option key={location} value={location}>{location}</option>
                    ))}
                </Select>
            </Box>
            <Box sx={{ marginRight: '10px' }} display='inline'>
                <Select native value={level} onChange={handelLevelChange} label="Select Level" id={"level"} autoWidth>
                    <option value=""></option>
                    {levelList.map((level) => (
                        <option key={level} value={level}>{level}</option>
                    ))}
                </Select>
            </Box>

        </ThemeProvider >
    )
};

export default Filter;